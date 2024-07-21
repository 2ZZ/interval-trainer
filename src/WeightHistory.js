import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import { createLogger } from "./utils";
import getEquipment from "./Equipment";

export default function WeightHistory(props) {
  const buttonStyle = { margin: 2 };

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
    setMultipliedWeight,
    setWeightMultiplier,
  } = props;

  const logger = createLogger(debug);
  const equipment = getEquipment();
  const [weightMultiplier, setLocalWeightMultiplier] = useState(2);
  const [sessionWeights, setSessionWeights] = useState({});

  useEffect(() => {
    function getRecommendedWeight(routineName, exerciseIndex, exerciseName) {
      // Check if we have a weight for this exercise in the current session
      // if (sessionWeights[exerciseName]) {
      //   return sessionWeights[exerciseName];
      // }

      if (!routineHistory || routineHistory.length === 0) {
        logger("No weight history found");
        return null;
      }

      let previousWeight = null;

      // // Search for the exercise name across all routines
      // for (let i = 0; i < routineHistory.length; i++) {
      //   const routine = routineHistory[i];
      //   if (routine.History) {
      //     const historyEntry = routine.History.find(
      //       (entry) => entry.exerciseName === exerciseName
      //     );
      //     if (historyEntry) {
      //       previousWeight = historyEntry.originalWeight || historyEntry.weight;
      //       break;
      //     }
      //   }
      // }

      // If not found, fall back to the original logic
      if (!previousWeight) {
        for (let i = 0; i < routineHistory.length; i++) {
          const routine = routineHistory[i];
          if (routine.Routine === routineName && routine.History) {
            const historyEntry = routine.History.find(
              (entry) => entry.exerciseIndex === exerciseIndex
            );
            if (historyEntry) {
              previousWeight =
                historyEntry.originalWeight || historyEntry.weight;
              break;
            }
          }
        }
      }

      if (!previousWeight) {
        logger("No matching weight history entry found");
        return null;
      }

      return previousWeight;
    }

    const currentExerciseName =
      currentRoutine.spec.exercises[currentExercise.index - 1];
    const exerciseDetails = exercises.find(
      (e) => e.name === currentExerciseName
    );

    const recommendedWeight =
      getRecommendedWeight(
        currentRoutine.spec.name,
        currentExercise.index,
        currentExerciseName,
        currentExercise.currentSet
      ) ||
      exerciseDetails?.defaults?.weight ||
      0;

    setSelectedWeight(recommendedWeight);
    setMultipliedWeight(recommendedWeight * weightMultiplier);
    setWeightMultiplier(weightMultiplier);
    logger("Recommended weight is: " + recommendedWeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoutine.spec.name, currentExercise, sessionWeights]);

  const handleWeightSelect = (weight) => {
    const currentExerciseName =
      currentRoutine.spec.exercises[currentExercise.index - 1];
    setSelectedWeight(weight);
    setMultipliedWeight(weight * weightMultiplier);
    setWeightMultiplier(weightMultiplier);
    setSessionWeights((prevWeights) => ({
      ...prevWeights,
      [currentExerciseName]: weight,
    }));
  };

  const handleMultiplyWeight = (newMultiplier) => {
    setLocalWeightMultiplier(newMultiplier);
    setMultipliedWeight(selectedWeight * newMultiplier);
    setWeightMultiplier(newMultiplier);
  };

  return (
    <div>
      {routineStarted && !routinePaused && (
        <>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
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
                  sx={buttonStyle}
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
                  onClick={() => handleWeightSelect(weight)}
                >
                  {weight} KG
                </Button>
              );
            })}
          </Box>
          <Divider style={{ margin: "10px 0" }} />
          <Box
            display="flex"
            justifyContent="center"
            style={{ marginTop: "10px" }}
          >
            <Button
              variant="outlined"
              color={weightMultiplier === 1 ? "success" : "primary"}
              sx={buttonStyle}
              style={{
                margin: "5px",
                padding: "10px",
                backgroundColor: weightMultiplier === 1 ? "lightblue" : "white",
                border:
                  weightMultiplier === 1 ? "2px solid blue" : "1px solid gray",
              }}
              onClick={() => handleMultiplyWeight(1)}
            >
              x1
            </Button>
            <Button
              variant="outlined"
              color={weightMultiplier === 2 ? "success" : "primary"}
              sx={buttonStyle}
              style={{
                margin: "5px",
                padding: "10px",
                backgroundColor: weightMultiplier === 2 ? "lightblue" : "white",
                border:
                  weightMultiplier === 2 ? "2px solid blue" : "1px solid gray",
              }}
              onClick={() => handleMultiplyWeight(2)}
            >
              x2
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}
