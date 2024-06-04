import React, { useEffect } from "react";
import Button from "@mui/material/Button";

import { createLogger } from "./utils";
import getEquipment from "./Equipment";

export default function WeightHistory(props) {
  const sx = { margin: 2 };

  const {
    debug,
    exercises,
    currentRoutine,
    routineHistory,
    currentExercise,
    routineStarted,
    routinePaused,
    selectedWeight,
    setSelectedWeight,
  } = props;

  const log = createLogger(debug);

  const equipment = getEquipment();

  useEffect(() => {
    function getMostRecentWeightUsed(routineName, currentExerciseIndex) {
      if (!routineHistory || routineHistory.length === 0) {
        log("No weight history found");
        return null;
      }

      for (let i = 0; i < routineHistory.length; i++) {
        const routine = routineHistory[i];

        if (routine.Routine === routineName && routine.History) {
          const historyEntry = routine.History.find(
            (entry) => entry.exerciseIndex === currentExerciseIndex
          );
          if (historyEntry) {
            log("Found weight history entry:" + JSON.stringify(historyEntry));
            return historyEntry.weight;
          }
        }
      }

      log("No matching weight history entry found");
      return null;
    }

    const exerciseName =
      currentRoutine.spec.exercises[currentExercise.index - 1];
    const exerciseDetails = exercises.find((e) => e.name === exerciseName);

    setSelectedWeight(
      getMostRecentWeightUsed(
        currentRoutine.spec.name,
        currentExercise.index
      ) ||
        exerciseDetails.defaults?.weight ||
        0
    );
    log("selectedWeight is: " + selectedWeight);
  }, [currentRoutine.spec.name, currentExercise.index]);

  return (
    <div>
      {/* Set complete */}
      {routineStarted && !routinePaused && (
        <>
          {equipment.weight.dumbbell.kg.map((weight, index) => {
            let buttonColor = "primary";
            if (weight === selectedWeight) {
              buttonColor = "success";
            } else if (
              selectedWeight &&
              weight > selectedWeight &&
              (selectedWeight === 0 ||
                equipment.weight.dumbbell.kg.indexOf(weight) ===
                  equipment.weight.dumbbell.kg.indexOf(selectedWeight) + 1)
            ) {
              buttonColor = "warning";
            }
            return (
              <Button
                key={index}
                variant="outlined"
                color={buttonColor}
                sx={sx}
                style={{
                  margin: "5px",
                  padding: "10px",
                  backgroundColor:
                    selectedWeight === weight ? "lightblue" : "white",
                  border:
                    selectedWeight === weight
                      ? "2px solid blue"
                      : "1px solid gray",
                }}
                onClick={() => setSelectedWeight(weight)}
              >
                {weight} KG
              </Button>
            );
          })}
        </>
      )}
    </div>
  );
}
