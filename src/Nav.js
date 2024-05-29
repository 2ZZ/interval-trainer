import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import getEquipment from "./Equipment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function Nav(props) {
  const sx = { margin: 2 };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    currentRoutine,
    routineStarted,
    routinePaused,
    currentMode,
    setSet,
    routineHistory,
    currentExercise,
    onClickStop,
  } = props;

  const equipment = getEquipment();

  function getMostRecentWeightUsed(routineName, exerciseIndex) {
    if (!routineHistory || routineHistory.length === 0) {
      return null;
    }

    for (let i = 0; i < routineHistory.length; i++) {
      /* for (let i = routineHistory.length - 1; i >= 0; i--) { */
      const routine = routineHistory[i];

      if (routine.Routine === routineName && routine.History) {
        const historyEntry = routine.History.find(
          (entry) => entry.exerciseIndex === exerciseIndex
        );
        if (historyEntry) {
          return historyEntry.weight;
        }
      }
    }

    return null;
  }

  return (
    <div>
      {/* Start / Stop */}
      {routineStarted ? (
        !routinePaused && (
          <Button
            variant="outlined"
            color="error"
            sx={sx}
            onClickCapture={handleOpen}
          >
            Stop
          </Button>
        )
      ) : (
        <Button
          variant="outlined"
          color="success"
          sx={sx}
          onClick={props.onClickStart}
        >
          Start
        </Button>
      )}

      {/* Reset */}
      {currentRoutine.phase === "finished" && (
        <Button
          variant="outlined"
          color="warning"
          sx={sx}
          onClick={props.onClickReset}
        >
          Reset
        </Button>
      )}

      {/* Set complete */}
      {currentMode.name === "click" && routineStarted && !routinePaused && (
        <>
          {equipment.weight.dumbbell.kg.map((weight) => {
            const mostRecentWeight = getMostRecentWeightUsed(
              currentRoutine.spec.name,
              currentExercise.index
            );

            let buttonColor = "primary";
            if (weight === mostRecentWeight) {
              buttonColor = "success";
            } else if (
              mostRecentWeight &&
              weight > mostRecentWeight &&
              (mostRecentWeight === 0 ||
                equipment.weight.dumbbell.kg.indexOf(weight) ===
                  equipment.weight.dumbbell.kg.indexOf(mostRecentWeight) + 1)
            ) {
              buttonColor = "warning";
            }

            return (
              <Button
                key={weight}
                variant="outlined"
                color={buttonColor}
                sx={sx}
                onClick={() => {
                  setSet((set) => ({
                    ...set,
                    isComplete: true,
                    weight: weight,
                  }));
                }}
              >
                {weight} kg
              </Button>
            );
          })}
        </>
      )}

      {/* Pause / Unpause */}
      {currentMode.name !== "click" && routineStarted && (
        <Button
          variant="outlined"
          color="warning"
          sx={sx}
          onClick={routinePaused ? props.onClickUnpause : props.onClickPause}
        >
          {routinePaused ? "Unpause" : "Pause"}
        </Button>
      )}

      {/* Rewind */}
      {currentMode.name !== "click" &&
        routineStarted &&
        routinePaused &&
        currentRoutine.phase !== "countdown" &&
        !(
          props.workTime === props.currentRoutine.spec.workTime &&
          props.restTime === props.currentRoutine.spec.restTime
        ) && (
          <Button
            variant="outlined"
            color="secondary"
            sx={sx}
            onClick={props.onClickRewind}
          >
            Rewind
          </Button>
        )}

      {/* Confirm stop modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            variant="outlined"
            color="error"
            sx={sx}
            onClick={() => {
              onClickStop();
              handleClose();
            }}
          >
            Confirm STOP
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
