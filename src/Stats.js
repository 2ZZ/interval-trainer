import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";

import { createLogger } from "./utils";

export default function Stats(props) {
  const {
    debug,
    format,
    currentMode,
    currentRoutine,
    currentExercise,
    routineStarted,
    routineFinished,
    routineStartTime,
    setRoutineStartTime,
    historyUpdated,
    setHistoryUpdated,
    timers,
    routineHistory,
    setExerciseCounts,
  } = props;

  const log = createLogger(debug);

  React.useEffect(() => {
    if (routineStarted) {
      setRoutineStartTime(setDate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routineStarted]);

  React.useEffect(() => {
    // if (routineFinished && currentRoutine.percentComplete > 25) {
    if (routineFinished) {
      saveStatsToHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routineFinished]);

  React.useEffect(() => {
    const counts = countExercisesAcrossHistory(routineHistory);
    log("here");
    setExerciseCounts(counts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(routineHistory)]);

  function setDate() {
    let newDate = new Date();
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let minutes = (newDate.getMinutes() < 10 ? "0" : "") + newDate.getMinutes();
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  function countExercisesAcrossHistory(routineHistory) {
    const exerciseCounts = {};

    routineHistory.forEach((routine) => {
      if (routine.History) {
        routine.History.forEach((entry) => {
          const exerciseName = entry.exerciseName || entry.exercise;
          if (exerciseCounts[exerciseName]) {
            exerciseCounts[exerciseName]++;
          } else {
            exerciseCounts[exerciseName] = 1;
          }
        });
      }
    });

    log(exerciseCounts);
    return exerciseCounts;
  }

  function generateStatsObj() {
    return {
      Date: routineStartTime,
      Routine: currentRoutine.spec.name,
      "Percent completed": currentRoutine.percentComplete + "%",
      "Paused time": getHumanTime(timers.paused),
      "Total time": getHumanTime(timers.total),
      Mode: currentMode.displayName,
      Format: format,
      History: currentRoutine.history,
    };
  }

  function generateStatsStr() {
    const stats = generateStatsObj();
    const statsStr = JSON.stringify(stats, null, 2);
    return statsStr;
  }

  function copyStats() {
    navigator.clipboard.writeText(generateStatsStr());
  }

  function downloadStats() {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(generateStatsStr())
    );
    element.setAttribute("download", `routine-${routineStartTime}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function saveStatsToHistory() {
    const statsStr = localStorage.getItem("workoutHistory") || "[]";
    let stats = JSON.parse(statsStr);
    log("Saving stats: " + JSON.stringify(stats));
    stats.unshift(generateStatsObj());
    localStorage.setItem("workoutHistory", JSON.stringify(stats));
    setHistoryUpdated(!historyUpdated);
  }

  function getHumanTime(time) {
    const date = new Date(null);
    date.setSeconds(time);
    return date.toISOString().slice(11, 19);
  }

  return (
    <div>
      {routineStartTime && (
        <p>
          <b>Started at:</b> {routineStartTime}
        </p>
      )}
      <p>
        <b>Routine:</b> {currentRoutine.spec.name} ({format})
      </p>
      <p>
        <b>Completed:</b> {currentRoutine.percentComplete}% (
        {currentExercise.index}/{currentRoutine.spec.exercises.length})
      </p>
      {currentMode === "timed" && (
        <p>
          <b>Paused time:</b> {getHumanTime(timers.paused)}
        </p>
      )}
      <p>
        <b>Total time:</b> {getHumanTime(timers.total)}
      </p>

      <div style={{ textAlign: "right" }}>
        <IconButton onClick={() => copyStats()}>
          <ContentCopyIcon color="action" />
        </IconButton>
        <IconButton onClick={() => downloadStats()}>
          <SaveAltIcon color="action" />
        </IconButton>
        <IconButton onClick={() => saveStatsToHistory()}>
          <SaveIcon color="action" />
        </IconButton>
      </div>
    </div>
  );
}
