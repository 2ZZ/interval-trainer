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

export default function Nav(props) {
  const sx = { margin: 2 };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Start / Stop */}
      {props.workoutStarted ? (
        <>
          {props.workoutPaused ? null : (
            <Button
              variant="outlined"
              color="error"
              sx={sx}
              onClickCapture={() => handleOpen()}
            >
              Stop
            </Button>
          )}
        </>
      ) : (
        <Button
          variant="outlined"
          color="success"
          sx={sx}
          onClick={() => props.onClickStart()}
        >
          Start
        </Button>
      )}

      {/* Reset */}
      {props.workoutPhase === "finished" ? (
        <Button
          variant="outlined"
          color="warning"
          sx={sx}
          onClick={() => props.onClickReset()}
        >
          Reset
        </Button>
      ) : null}

      {/* Pause / Unpause */}
      {(() => {
        if (props.workoutStarted && props.workoutPaused) {
          return (
            <Button
              variant="outlined"
              color="warning"
              sx={sx}
              onClick={() => props.onClickUnpause()}
            >
              Unpause
            </Button>
          );
        } else if (props.workoutStarted && !props.workoutPaused) {
          return (
            <Button
              variant="outlined"
              color="warning"
              sx={sx}
              onClick={() => props.onClickPause()}
            >
              Pause
            </Button>
          );
        }
      })()}

      {/* Rewind */}
      {(() => {
        if (
          props.workoutStarted &&
          props.workoutPaused &&
          props.workoutPhase !== "countdown" &&
          !(
            props.workTime === props.currentWorkout.workTime &&
            props.restTime === props.currentWorkout.restTime
          )
        ) {
          return (
            <Button
              variant="outlined"
              color="secondary"
              sx={sx}
              onClick={() => props.onClickRewind()}
            >
              Rewind
            </Button>
          );
        }
      })()}

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
            onClickCapture={() => handleOpen()}
            onClick={() => {
              props.onClickStop();
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
