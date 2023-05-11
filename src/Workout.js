import React, { useRef } from "react";

export default function Workout({
  debug,
  workoutStarted,
  setWorkoutStarted,
  workoutStopped,
  setWorkoutStopped,
  workoutFinished,
  setWorkoutFinished,
  workoutReset,
  setWorkoutReset,
  currentWorkout,
  setCurrentWorkout,
  currentSet,
  setCurrentSet,
  currentExersize,
  setCurrentExersize,
  workoutPhase,
  setWorkoutPhase,
  workTime,
  setWorkTime,
  restTime,
  setRestTime,
  workoutPaused,
  setWorkoutPaused,
  totalTime,
  setTotalTime,
  pausedTime,
  setPausedTime,
  exerciseStarted,
  setExerciseStarted,
  countdownTime,
  setPercentWorkoutComplete,
  workoutRewind,
  setWorkoutRewind,
  setWorkoutStartTime,
}) {
  const interval = useRef(null);

  let intervalTime = 1000;
  let startDelay = countdownTime * 1000;
  if (debug) {
    intervalTime = 100;
    startDelay = countdownTime * 10;
  }

  function log(msg) {
    if (debug) {
      console.log(msg);
    }
  }

  function calculateWorkoutPercentComplete() {
    if (!workoutStarted && !workoutFinished) {
      return 0;
    }
    const totalExersizes =
      currentWorkout.exercises.length * currentWorkout.sets;
    const completedExersizes =
      currentWorkout.exercises.length * currentSet -
      (currentWorkout.exercises.length - (currentExersize - 1));
    const percentage = Math.round((completedExersizes / totalExersizes) * 100);
    log("Percent complete: " + percentage);
    return percentage;
  }

  function pauseWorkout() {
    log("Pausing workout");
    clearInterval(interval.workoutTimer);
    interval.pauseTimer = setInterval(() => {
      setPausedTime(pausedTime++);
      setTotalTime(totalTime++);
    }, intervalTime);
  }

  function unpauseWorkout() {
    log("Unpausing workout");
    clearInterval(interval.pauseTimer);
    runExersizeInterval();
  }

  function startWorkout() {
    log("Starting workout");
    resetWorkout();
    setWorkoutStarted(true);
    setWorkoutPhase("countdown");
    log("Starting workout after delay: " + startDelay);
    setTimeout(() => {
      log("Triggering startSet");
      startSet(1);
    }, startDelay);
  }

  function resetWorkout() {
    log("Resetting workout");
    setWorkoutStarted(false);
    setWorkoutFinished(false);
    setWorkoutStopped(false);
    setWorkoutReset(false);
    setWorkoutPaused(false);
    setWorkoutPhase("ready");
    setTotalTime(0);
    setPausedTime(0);
    setCurrentSet(0);
    setPercentWorkoutComplete(0);
    setCurrentExersize(0);
    setWorkoutStartTime("");
  }

  function startSet(set) {
    log("Starting set: " + set);
    setCurrentSet(set);
    setCurrentExersize(1);
  }

  function stopSet() {
    log("Stopping set: " + currentSet);
    clearInterval(interval.workoutTimer);
    setWorkoutPhase("ready");
  }

  function stopWorkout() {
    log("Stopping workout");
    clearInterval(interval.workoutTimer);
    clearInterval(interval.pauseTimer);
    setWorkoutPhase("finished");
    setWorkoutStarted(false);
    setWorkoutFinished(true);
    setExerciseStarted(false);
  }

  function runExersize() {
    log("Running exersize");
    setWorkoutPhase("work");
    setWorkTime(currentWorkout.workTime);
    setRestTime(currentWorkout.restTime);
    setExerciseStarted(true);
  }

  function runExersizeInterval() {
    let localWorkTime = workTime;
    let localRestTime = restTime;
    let localCurrentExercise = currentExersize;
    interval.workoutTimer = setInterval(() => {
      setTotalTime(totalTime++);
      log(
        "localCurrentExercise: " +
          localCurrentExercise +
          ", phase: " +
          workoutPhase +
          ", localWorkTime: " +
          localWorkTime +
          ", localRestTime: " +
          localRestTime +
          ", currentSet: " +
          currentSet
      );
      if (localWorkTime !== 0) {
        // Still work to do
        setWorkoutPhase("work");
        localWorkTime--;
        log("Reducing localWorkTime to: " + localWorkTime);
        setWorkTime(localWorkTime);
      } else if (localRestTime !== 0) {
        // Still rest to do
        setWorkoutPhase("rest");
        localRestTime--;
        log("Reducing localRestTime to: " + localRestTime);
        setRestTime(localRestTime);
      } else {
        // Exercize is finished
        localCurrentExercise++;
        log("Setting currentExersize: " + localCurrentExercise);
        log("Resetting worktime to: " + currentWorkout.workTime);
        clearInterval(interval.workoutTimer);
        setCurrentExersize(localCurrentExercise);
        setExerciseStarted(false);
      }
    }, intervalTime);
  }

  function rewindWorkout() {
    log("Rewinding workout");
    if (workoutPhase === "work") {
      setWorkTime(currentWorkout.workTime);
    } else if (workoutPhase === "rest") {
      setRestTime(currentWorkout.restTime);
    }
    setWorkoutRewind(false);
  }

  React.useEffect(() => {
    log("exerciseStarted effect ran with value " + exerciseStarted);
    if (!exerciseStarted) {
      log("exerciseStarted effect returned as value is false");
      return;
    }
    runExersizeInterval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseStarted]);

  React.useEffect(() => {
    log("workoutPaused effect ran with value: " + workoutPaused);
    if (workoutPaused === undefined) {
    } else if (workoutPaused) {
      pauseWorkout({
        pausedTime: pausedTime,
        setPausedTime: setPausedTime,
      });
    } else if (workoutPhase !== "countdown") {
      unpauseWorkout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutPaused]);

  React.useEffect(() => {
    log("workoutStarted effect triggered with value: " + workoutStarted);
    if (workoutStarted) {
      startWorkout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutStarted]);

  React.useEffect(() => {
    log("workoutStopped effect triggered with value: " + workoutStopped);
    if (workoutStopped) {
      stopWorkout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutStopped]);

  React.useEffect(() => {
    log("workoutReset effect triggered with value: " + workoutReset);
    if (workoutReset) {
      log("running resetWorkoutEffect");
      resetWorkout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutReset]);

  React.useEffect(() => {
    log(
      "currentExersize effect triggered, currentExersize: " + currentExersize
    );
    setPercentWorkoutComplete(calculateWorkoutPercentComplete());
    if (currentExersize === undefined || currentExersize === 0) {
      log(
        "Returning from currentExersize effect as currentExersize is: " +
          currentExersize
      );
      return;
    } else if (currentExersize > currentWorkout.exercises.length) {
      // end of set
      log("currentExersize: " + currentExersize);
      log(
        "currentWorkout.exercises.length: " + currentWorkout.exercises.length
      );
      log("Finished set: " + currentSet);
      if (currentSet < currentWorkout.sets) {
        // Run next set
        stopSet();
        startSet(currentSet + 1);
      } else {
        // Workout finished
        stopWorkout();
      }
    } else {
      // trigger the loop for this exersize
      runExersize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExersize]);

  React.useEffect(() => {
    log("currentWorkout effect triggered with value: " + currentWorkout.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWorkout]);

  React.useEffect(() => {
    log("workoutRewind effect triggered with value: " + workoutRewind);
    if (workoutRewind) {
      rewindWorkout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutRewind]);
}
