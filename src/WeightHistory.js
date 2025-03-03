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
    currentRoutine,
    routineHistory,
    currentExercise,
    routineStarted,
    routinePaused,
    selectedWeight,
    setSelectedWeight,
    setMultipliedWeight,
    weightMultiplier,
    setWeightMultiplier,
  } = props;

  const log = createLogger(debug);
  const equipment = getEquipment();
  const [sessionWeights, setSessionWeights] = useState({});

  useEffect(() => {
    function getRecommendedWeightAndMultiplier(
      routineName,
      exerciseIndex,
      exerciseName
    ) {
      let result = { weight: 0, multiplier: 1 };
      if (sessionWeights.hasOwnProperty(exerciseName)) {
        log(
          `found exercize name ${exerciseName} in sessionWeights: ${JSON.stringify(
            sessionWeights[exerciseName]
          )}`
        );
        result["weight"] = sessionWeights[exerciseName].weight;
        result["multiplier"] = parseInt(
          sessionWeights[exerciseName].multiplier
        );
      } else {
        log(
          "sessionWeights " +
            JSON.stringify(sessionWeights) +
            " does not include " +
            exerciseName
        );
      }

      if (routineHistory && routineHistory.length > 0) {
        let found = false;
        for (let i = 0; i < routineHistory.length; i++) {
          const routine = routineHistory[i];
          if (routine.Routine === routineName && routine.History) {
            found = true;
            const historyEntry = routine.History.find(
              (entry) => entry.exerciseIndex === exerciseIndex
            );
            if (historyEntry && historyEntry.originalWeight) {
              log(
                `Found historyEntry containing exerciseIndex: ${JSON.stringify(
                  historyEntry
                )}`
              );
              if (historyEntry.weight && historyEntry.multiplier) {
                result["weight"] = historyEntry.weight;
                result["multiplier"] = historyEntry.multiplier;
                break;
              }
            }
          }
        }
        if (!found) {
          log(
            "No weight history found for routineName: " +
              routineName +
              ", in history: " +
              JSON.stringify(routineHistory)
          );
        }
      } else {
        log("No weight history found");
      }

      return result;
    }

    const currentExerciseName =
      currentRoutine.spec.exercises[currentExercise.index - 1];

    const recommended = getRecommendedWeightAndMultiplier(
      currentRoutine.spec.name,
      currentExercise.index,
      currentExerciseName
    );

    log(
      "Recommended weight is: " +
        recommended.weight +
        ", Multiplier: " +
        recommended.multiplier
    );

    setSelectedWeight(recommended.weight);
    setWeightMultiplier(recommended.multiplier);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoutine.spec.name, currentExercise]);

  const handleWeightSelect = (weight) => {
    const currentExerciseName =
      currentRoutine.spec.exercises[currentExercise.index - 1];
    setMultipliedWeight(weight * weightMultiplier);
    setWeightMultiplier(weightMultiplier);
    setSessionWeights((prevWeights) => ({
      ...prevWeights,
      [currentExerciseName]: { weight: weight, multiplier: weightMultiplier },
    }));
    setSelectedWeight(weight);
  };

  // useEffect(() => {
  //   log("selectedWeight: " + selectedWeight);
  // }, [log, selectedWeight]);

  const handleMultiplyWeight = (newMultiplier) => {
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
