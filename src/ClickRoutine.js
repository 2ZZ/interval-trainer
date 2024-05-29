import React, { useEffect, useRef } from "react";

import { createLogger } from "./utils";

export default function ClickRoutine({
  debug,
  routineStarted,
  setRoutineStarted,
  routineStopped,
  setRoutineStopped,
  routineFinished,
  setRoutineFinished,
  setRoutineReset,
  currentRoutine,
  setCurrentRoutine,
  currentExercise,
  setCurrentExercise,
  countdownTime,
  setRoutineStartTime,
  set,
  setSet,
  setTimers,
}) {
  const log = createLogger(debug);
  const interval = useRef(null);

  const intervalTime = debug ? 100 : 1000;
  const startDelay = countdownTime * (debug ? 10 : 1000);

  function calculateRoutinePercentComplete() {
    if (!routineStarted && !routineFinished) {
      return 0;
    } else if (routineFinished) {
      return 100;
    } else {
      const totalExercises = currentRoutine.spec.exercises.length;
      const completedExercises = currentExercise.index - 1;
      const percentage = Math.round(
        (completedExercises / totalExercises) * 100
      );
      log("Percent complete: " + percentage);
      return percentage;
    }
  }

  const resetRoutine = () => {
    log("Resetting routine");
    setRoutineStarted(false);
    setRoutineFinished(false);
    setRoutineStopped(false);
    setRoutineReset(false);
    setCurrentRoutine((currentRoutine) => ({
      ...currentRoutine,
      percentComplete: 0,
      history: [],
      phase: "ready",
    }));
    setTimers({ total: 0, paused: 0, work: 0, rest: 0 });
    setCurrentExercise(1);
    setRoutineStartTime("");
    setCurrentExercise((currentExercise) => ({
      ...currentExercise,
      index: 1,
      currentSet: 1,
    }));
  };

  useEffect(() => {
    log(`routineStarted change triggered effect (${routineStarted})`);
    if (routineStarted) {
      log("Starting routine");
      resetRoutine();
      setCurrentRoutine((currentRoutine) => ({
        ...currentRoutine,
        phase: "work",
      }));
      setRoutineStarted(true);
      log(`Starting routine after delay: ${startDelay}`);
      setTimeout(() => {
        startRoutineTimer();
        setCurrentExercise((currentExercise) => ({
          ...currentExercise,
          started: true,
        }));
      }, startDelay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routineStarted]);

  const startRoutineTimer = () => {
    interval.routineTimer = setInterval(() => {
      setTimers((timers) => ({
        ...timers,
        total: timers.total + 1,
      }));
    }, intervalTime);
  };

  React.useEffect(() => {
    log("routineStopped effect triggered with value: " + routineStopped);
    if (routineStopped) {
      stopRoutine();
      resetRoutine();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routineStopped]);

  const stopRoutineTimer = () => {
    log(`Stopping routine timer`);
    clearInterval(interval.routineTimer);
  };

  const stopRoutine = () => {
    log("Stopping routine");
    stopRoutineTimer();
    setRoutineStarted(false);
    setRoutineFinished(true);
    setCurrentExercise((currentExercise) => ({
      ...currentExercise,
      started: false,
    }));
    setCurrentRoutine((currentRoutine) => ({
      ...currentRoutine,
      phase: "ready",
    }));
  };

  useEffect(() => {
    log(`Set change triggered effect (${JSON.stringify(set, null, 2)})`);
    if (set.isComplete) {
      if (currentExercise.index < currentRoutine.spec.exercises.length) {
        setCurrentExercise((currentExercise) => ({
          ...currentExercise,
          index: currentExercise.index + 1,
          currentSet: 1,
        }));
      } else {
        log("Routine complete.");
        stopRoutine();
      }

      setSet((set) => ({
        ...set,
        isComplete: false,
      }));
      setCurrentRoutine((currentRoutine) => ({
        ...currentRoutine,
        history: [
          ...currentRoutine.history,
          {
            exerciseIndex: currentExercise.index,
            set: currentExercise.currentSet,
            weight: set.weight,
          },
        ],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [set]);

  useEffect(() => {
    log(
      `currentExercise change triggered effect (${JSON.stringify(
        currentExercise,
        null,
        2
      )})`
    );
    setCurrentRoutine((currentRoutine) => ({
      ...currentRoutine,
      percentComplete: calculateRoutinePercentComplete(),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExercise]);
}
