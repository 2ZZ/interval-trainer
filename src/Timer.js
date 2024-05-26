import * as React from "react";
import ReactCountdownClock from "react-countdown-clock";

import { createLogger } from "./utils";

const getColor = (phase) => {
  switch (phase) {
    case "work":
      return "red";
    case "rest":
      return "green";
    default:
      return "blue";
  }
};

const getTime = (currentRoutine, countdownTime) => {
  switch (currentRoutine.phase) {
    case "work":
      return currentRoutine.spec.workTime;
    case "rest":
      return currentRoutine.spec.restTime;
    case "countdown":
      return countdownTime;
    default:
      return 0;
  }
};

const Timer = ({
  debug,
  currentRoutine,
  countdownTime,
  routinePaused,
  routineStarted,
  routineRewind,
}) => {
  const log = createLogger(debug);
  const color = getColor(currentRoutine.phase);
  const time = getTime(currentRoutine, countdownTime);
  const paused = routinePaused || !routineStarted;

  return (
    <div style={{ position: "relative" }}>
      <ReactCountdownClock
        key={`${currentRoutine.phase}${time}${routineRewind}`}
        seconds={time}
        color={color}
        alpha={0.9}
        size={200}
        onComplete={() => {
          log("Timer complete");
        }}
        paused={paused}
      />
    </div>
  );
};

export default Timer;
