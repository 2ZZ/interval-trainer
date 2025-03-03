import React, { useState, useEffect } from "react";

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

  const currentExerciseName =
    currentRoutine.spec.exercises[currentExercise.index - 1];

  const log = createLogger(debug);

  const increment = () => {
    const newSelectedReps = selectedReps + 1;
    log("Incrementing selectedReps to: " + newSelectedReps);
    setSessionReps((prevSessionReps) => ({
      ...prevSessionReps,
      [currentExerciseName]: newSelectedReps,
    }));
    setSelectedReps(newSelectedReps);
  };

  const decrement = () => {
    if (selectedReps > 0) {
      const newSelectedReps = selectedReps - 1;
      log("Decrementing selectedReps to: " + newSelectedReps);
      setSessionReps((prevSessionReps) => ({
        ...prevSessionReps,
        [currentExerciseName]: newSelectedReps,
      }));
      setSelectedReps(newSelectedReps);
    }
  };

  const exerciseName = currentRoutine.spec.exercises[currentExercise.index - 1];
  const exerciseDetails = exercises.find((e) => e.name === exerciseName);
  const [sessionReps, setSessionReps] = useState({});

  useEffect(() => {
    function getRecommendedReps(routineName, currentExerciseIndex) {
      if (sessionReps.hasOwnProperty(exerciseName)) {
        return sessionReps[exerciseName];
      }

      if (routineHistory && routineHistory.length > 0) {
        log("No rep history found");

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
      }

      log("No matching rep history entry found");
      return exerciseDetails?.defaults?.reps || 0;
    }

    const exerciseName =
      currentRoutine.spec.exercises[currentExercise.index - 1];
    const exerciseDetails = exercises.find((e) => e.name === exerciseName);

    setSelectedReps(
      getRecommendedReps(currentRoutine.spec.name, currentExercise.index)
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
