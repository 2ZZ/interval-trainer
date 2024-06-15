import React, { useRef } from "react";

import { createLogger } from "./utils";

export default function Routine({
  debug,
  routineStarted,
  setRoutineStarted,
  routineStopped,
  setRoutineStopped,
  routineFinished,
  setRoutineFinished,
  routineReset,
  setRoutineReset,
  currentRoutine,
  setCurrentRoutine,
  currentExercise,
  setCurrentExercise,
  routinePaused,
  setRoutinePaused,
  countdownTime,
  routineRewind,
  setRoutineRewind,
  setRoutineStartTime,
  set,
  setTimers,
}) {
  const log = createLogger(debug);
  const interval = useRef(null);

  let intervalTime = 1000;
  let startDelay = countdownTime * 1000;
  if (debug && currentRoutine.spec.name === "Debug") {
    intervalTime = 100;
    startDelay = countdownTime * 10;
  }

  function calculateRoutinePercentComplete() {
    if (!routineStarted && !routineFinished) {
      return 0;
    } else if (routineFinished) {
      return 100;
    } else if (currentExercise.index < 1) {
      return 0;
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

  function pauseRoutine() {
    log("Pausing routine");
    clearInterval(interval.routineTimer);
    interval.pauseTimer = setInterval(() => {
      setTimers((timers) => ({
        ...timers,
        paused: timers.paused + 1,
        total: timers.total + 1,
      }));
    }, intervalTime);
  }

  function unpauseRoutine() {
    log("Unpausing routine");
    clearInterval(interval.pauseTimer);
    runExerciseInterval();
  }

  function startRoutine() {
    log("Starting routine");
    resetRoutine();
    setRoutineStarted(true);
    setCurrentRoutine((currentRoutine) => ({
      ...currentRoutine,
      phase: "countdown",
      history: [],
    }));
    setTimers({ total: 0, paused: 0, work: 0, rest: 0 });
    log("Starting routine after delay: " + startDelay);
    setTimeout(() => {
      log("Triggering startSet");
      startSet(1);
    }, startDelay);
  }

  function resetRoutine() {
    log("Resetting routine");
    setRoutineStarted(false);
    setRoutineFinished(false);
    setRoutineStopped(false);
    setRoutineReset(false);
    setRoutinePaused(false);
    setCurrentRoutine((currentRoutine) => ({
      ...currentRoutine,
      percentComplete: 0,
      phase: "ready",
      lastSet: false,
    }));
    setTimers({ total: 0, paused: 0, work: 0, rest: 0 });
    setCurrentExercise((currentExercise) => ({
      ...currentExercise,
      index: 0,
      currentSet: 0,
    }));
    setRoutineStartTime("");
  }

  function startSet(newSet) {
    log(
      `Starting set (${JSON.stringify(
        set,
        null,
        2
      )}), currentExercise ${currentExercise}`
    );
    setCurrentExercise((currentExercise) => ({
      ...currentExercise,
      currentSet: newSet,
    }));
  }

  function stopSet() {
    log("Stopping set: " + set.currentSet);
    clearInterval(interval.routineTimer);
    setCurrentRoutine((currentRoutine) => ({
      ...currentRoutine,
      phase: "ready",
    }));
  }

  function stopRoutine() {
    log("Stopping routine");
    clearInterval(interval.routineTimer);
    clearInterval(interval.pauseTimer);
    setCurrentRoutine((currentRoutine) => ({
      ...currentRoutine,
      phase: "finished",
    }));
    setRoutineStarted(false);
    setRoutineFinished(true);
    setCurrentExercise((currentExercise) => ({
      ...currentExercise,
      started: false,
    }));
  }

  function runExercise() {
    log("Running exercise");
    setCurrentRoutine((currentRoutine) => ({
      ...currentRoutine,
      time: {
        ...currentRoutine.time,
        work: currentRoutine.spec.workTime,
        rest: currentRoutine.spec.restTime,
      },
      phase: "work",
    }));
    setCurrentExercise((currentExercise) => ({
      ...currentExercise,
      started: true,
    }));
  }

  function runExerciseInterval() {
    log(`Current routine: ${JSON.stringify(currentRoutine)}`);
    let localWorkTime = currentRoutine.spec.time.work;
    let localRestTime = currentRoutine.spec.time.rest;
    let localCurrentExerciseIndex = currentExercise.index;
    interval.routineTimer = setInterval(() => {
      setTimers((timers) => ({
        ...timers,
        total: timers.total + 1,
      }));
      if (localWorkTime !== 0) {
        // Still work to do
        localWorkTime--;
        log("Reducing localWorkTime to: " + localWorkTime);
        setCurrentRoutine((currentRoutine) => ({
          ...currentRoutine,
          time: {
            ...currentRoutine.time,
            work: localWorkTime,
          },
          phase: "work",
        }));
      } else if (localRestTime !== 0) {
        // Still rest to do
        localRestTime--;
        log("Reducing localRestTime to: " + localRestTime);
        setCurrentRoutine((currentRoutine) => ({
          ...currentRoutine,
          time: {
            ...currentRoutine.time,
            rest: localRestTime,
          },
          phase: "rest",
        }));
      } else {
        // Exercize is finished
        localCurrentExerciseIndex++;
        log("Setting currentExercise: " + localCurrentExerciseIndex);
        log("Resetting worktime to: " + currentRoutine.spec.workTime);
        clearInterval(interval.routineTimer);
        setCurrentExercise((currentExercise) => ({
          ...currentExercise,
          index: localCurrentExerciseIndex,
          started: false,
        }));
      }
    }, intervalTime);
  }

  function rewindRoutine() {
    log("Rewinding routine");
    if (currentRoutine.phase === "work") {
      setCurrentRoutine((currentRoutine) => ({
        ...currentRoutine,
        time: {
          ...currentRoutine.time,
          work: currentRoutine.spec.workTime,
        },
      }));
    } else if (currentRoutine.phase === "rest") {
      setCurrentRoutine((currentRoutine) => ({
        ...currentRoutine,
        time: {
          ...currentRoutine.time,
          rest: currentRoutine.spec.restTime,
        },
      }));
    }
    setRoutineRewind(false);
  }

  React.useEffect(() => {
    log("routinePaused effect ran with value: " + routinePaused);
    if (routinePaused === undefined) {
      return;
    } else if (routinePaused) {
      pauseRoutine();
    } else if (currentRoutine.phase !== "countdown") {
      unpauseRoutine();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routinePaused]);

  React.useEffect(() => {
    log("routineStarted effect triggered with value: " + routineStarted);
    if (routineStarted) {
      startRoutine();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routineStarted]);

  React.useEffect(() => {
    log("routineStopped effect triggered with value: " + routineStopped);
    if (routineStopped) {
      stopRoutine();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routineStopped]);

  React.useEffect(() => {
    log("routineReset effect triggered with value: " + routineReset);
    if (routineReset) {
      log("running resetRoutineEffect");
      resetRoutine();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routineReset]);

  React.useEffect(() => {
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
    if (currentExercise.started) {
      runExerciseInterval();
    }
    if (currentExercise.index === undefined || currentExercise.index === 0) {
      return;
    } else if (currentExercise > currentRoutine.spec.exercises.length) {
      // end of set
      log(
        "currentRoutine.exercises.length: " +
          currentRoutine.spec.exercises.length
      );
      log("Finished set: " + currentExercise.currentSet);
      if (currentExercise.currentSet < currentRoutine.spec.sets) {
        // Run next set
        stopSet();
        startSet(currentExercise.currentSet + 1);
      } else {
        // Routine finished
        stopRoutine();
      }
    } else {
      // trigger the loop for this exercise
      runExercise();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExercise]);

  React.useEffect(() => {
    log(
      "currentRoutine effect triggered with value: " + currentRoutine.spec.name
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoutine]);

  React.useEffect(() => {
    log("routineRewind effect triggered with value: " + routineRewind);
    if (routineRewind) {
      rewindRoutine();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routineRewind]);
}
