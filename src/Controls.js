import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function Controls(props) {
  const sx = { margin: 2 };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    currentRoutine,
    routineStarted,
    routinePaused,
    currentMode,
    onClickStop,
    onClickStart,
    onClickPause,
    onClickUnpause,
    onClickRewind,
    onClickReset,
    workTime,
    restTime,
    setSet,
  } = props;

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
          onClick={onClickStart}
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
          onClick={onClickReset}
        >
          Reset
        </Button>
      )}

      {/* Pause / Unpause */}
      {currentMode.name !== "click" && routineStarted && (
        <Button
          variant="outlined"
          color="warning"
          sx={sx}
          onClick={routinePaused ? onClickUnpause : onClickPause}
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
          workTime === currentRoutine.spec.workTime &&
          restTime === currentRoutine.spec.restTime
        ) && (
          <Button
            variant="outlined"
            color="secondary"
            sx={sx}
            onClick={onClickRewind}
          >
            Rewind
          </Button>
        )}

      {/* Next */}
      {currentMode.name === "click" && routineStarted && (
        <Button
          variant="outlined"
          color={(currentRoutine.lastSet && "success") || "warning"}
          sx={sx}
          onClick={() =>
            setSet((set) => ({
              ...set,
              isComplete: true,
            }))
          }
        >
          {(currentRoutine.lastSet && "Finish") || "Next"}
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
