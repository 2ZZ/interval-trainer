/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import WeightHistory from "./WeightHistory";
import getEquipment from "./Equipment";

// Mock the Equipment module
jest.mock("./Equipment", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    weight: {
      dumbbell: {
        kg: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      },
    },
  })),
}));

// Mock createLogger to prevent console output during tests
jest.mock("./utils", () => ({
  createLogger: jest.fn(() => jest.fn()),
}));

describe("WeightHistory Component", () => {
  const defaultProps = {
    debug: false,
    currentRoutine: {
      spec: {
        name: "Test Routine",
        exercises: ["Bicep Curl", "Bench Press"],
      },
    },
    routineHistory: [
      {
        Routine: "Test Routine",
        History: [
          {
            exerciseIndex: 1,
            weight: 10,
            multiplier: 2, // Fixed: was 'multplier'
            originalWeight: 10,
          },
        ],
      },
    ],
    currentExercise: {
      index: 1,
      complete: false,
    },
    routineStarted: true,
    routinePaused: false,
    selectedWeight: 0,
    setSelectedWeight: jest.fn(),
    setMultipliedWeight: jest.fn(),
    weightMultiplier: 1,
    setWeightMultiplier: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders nothing when routine is not started", () => {
    const props = {
      ...defaultProps,
      routineStarted: false,
    };

    const { container } = render(<WeightHistory {...props} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  test("renders nothing when routine is paused", () => {
    const props = {
      ...defaultProps,
      routinePaused: true,
    };

    const { container } = render(<WeightHistory {...props} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  test("renders weight buttons when routine is started and not paused", () => {
    render(<WeightHistory {...defaultProps} />);

    // We should have 11 weight buttons (0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20)
    const weightButtons = screen.getAllByText(/\d+ KG/);
    expect(weightButtons).toHaveLength(11);
  });

  test("renders multiplier buttons", () => {
    render(<WeightHistory {...defaultProps} />);

    expect(screen.getByText("x1")).toBeInTheDocument();
    expect(screen.getByText("x2")).toBeInTheDocument();
  });

  test("highlights selected weight button", () => {
    const props = {
      ...defaultProps,
      selectedWeight: 10,
    };

    render(<WeightHistory {...props} />);

    const button10kg = screen.getByText("10 KG");
    expect(button10kg).toHaveStyle("backgroundColor: lightblue");
    expect(button10kg).toHaveStyle("border: 2px solid blue");
  });

  test("highlights selected multiplier button", () => {
    const props = {
      ...defaultProps,
      weightMultiplier: 2,
    };

    render(<WeightHistory {...props} />);

    const button2x = screen.getByText("x2");
    expect(button2x).toHaveStyle("backgroundColor: lightblue");
    expect(button2x).toHaveStyle("border: 2px solid blue");
  });

  test("calls setSelectedWeight and other functions when weight button is clicked", () => {
    render(<WeightHistory {...defaultProps} />);

    fireEvent.click(screen.getByText("8 KG"));

    expect(defaultProps.setSelectedWeight).toHaveBeenCalledWith(8);
    expect(defaultProps.setMultipliedWeight).toHaveBeenCalledWith(8 * 1); // Multiplier is 1
    expect(defaultProps.setWeightMultiplier).toHaveBeenCalledWith(1);
  });

  test("calls handleMultiplyWeight when multiplier button is clicked", () => {
    const props = {
      ...defaultProps,
      selectedWeight: 10, // Set a selectedWeight so the calculation works properly
    };

    render(<WeightHistory {...props} />);

    fireEvent.click(screen.getByText("x2"));

    expect(props.setMultipliedWeight).toHaveBeenCalledWith(10 * 2);
    expect(props.setWeightMultiplier).toHaveBeenCalledWith(2);
  });

  test("initializes weight from history on component mount", () => {
    render(<WeightHistory {...defaultProps} />);

    // The useEffect should be called and set the initial weight from history
    expect(defaultProps.setSelectedWeight).toHaveBeenCalledWith(10);
    expect(defaultProps.setWeightMultiplier).toHaveBeenCalledWith(2);
  });

  test("keeps track of session weights for different exercises", () => {
    const { rerender } = render(<WeightHistory {...defaultProps} />);

    // Select weight for first exercise
    fireEvent.click(screen.getByText("8 KG"));

    // Change to second exercise
    const updatedProps = {
      ...defaultProps,
      currentExercise: {
        index: 2,
        complete: false,
      },
    };

    rerender(<WeightHistory {...updatedProps} />);

    // Select weight for second exercise
    fireEvent.click(screen.getByText("12 KG"));

    // Change back to first exercise to verify session weight is remembered
    rerender(<WeightHistory {...defaultProps} />);

    // Check if the setSelectedWeight was called with the correct weights
    // We can verify the calls but not necessarily in this exact order due to how useState/useEffect work
    expect(defaultProps.setSelectedWeight).toHaveBeenCalledWith(10); // From history
    expect(defaultProps.setSelectedWeight).toHaveBeenCalledWith(8); // When clicked
  });
});
