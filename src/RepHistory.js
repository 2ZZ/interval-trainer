import React, { useEffect } from "react";

import { createLogger } from "./utils";

function RepHistory(props) {
  const {
    debug,
    exercises,
    currentRoutine,
    currentExercise,
    selectedReps,
    setSelectedReps,
    routineHistory,
  } = props;

  const log = createLogger(debug);
  const increment = () => {
    log("Incrementing selectedReps to: " + (selectedReps + 1));
    setSelectedReps(selectedReps + 1);
  };

  const decrement = () => {
    if (selectedReps > 0) {
      setSelectedReps(selectedReps - 1);
    }
  };

  const exerciseName = currentRoutine.spec.exercises[currentExercise.index - 1];
  const exerciseDetails = exercises.find((e) => e.name === exerciseName);

  useEffect(() => {
    function getMostRecentReps(routineName, currentExerciseIndex) {
      if (!routineHistory || routineHistory.length === 0) {
        log("No rep history found");
        return null;
      }

      for (let i = 0; i < routineHistory.length; i++) {
        const routine = routineHistory[i];

        if (routine.Routine === routineName && routine.History) {
          const historyEntry = routine.History.find(
            (entry) => entry.exerciseIndex === currentExerciseIndex
          );
          if (historyEntry) {
            log("Found rep history entry:" + JSON.stringify(historyEntry));
            return historyEntry.reps || 10;
          }
        }
      }

      log("No matching rep history entry found");
      return null;
    }
    const exerciseName =
      currentRoutine.spec.exercises[currentExercise.index - 1];
    const exerciseDetails = exercises.find((e) => e.name === exerciseName);

    setSelectedReps(
      getMostRecentReps(currentRoutine.spec.name, currentExercise.index) ||
        exerciseDetails?.defaults?.reps ||
        0
    );
    log("selectedReps is: " + selectedReps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoutine.spec.name, currentExercise.index]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={decrement}
          style={{ fontSize: "20px", marginRight: "10px" }}
        >
          -
        </button>
        <span style={{ fontSize: "14px", margin: "10px" }}>
          {selectedReps || exerciseDetails?.defaults.reps}
        </span>
        <button
          onClick={increment}
          style={{ fontSize: "20px", marginLeft: "10px" }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default RepHistory;
