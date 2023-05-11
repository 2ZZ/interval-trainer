import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";

export default function Stats(props) {
  React.useEffect(() => {
    if (props.workoutStarted) {
      props.setWorkoutStartTime(setDate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.workoutStarted]);

  React.useEffect(() => {
    if (props.workoutFinished && props.percentWorkoutComplete > 25) {
      saveStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.workoutFinished]);

  function setDate() {
    let newDate = new Date();
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let minutes = (newDate.getMinutes() < 10 ? "0" : "") + newDate.getMinutes();
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  function generateStatsObj() {
    return {
      Date: props.workoutStartTime,
      Routine: props.currentWorkout.name,
      "Percent completed": props.percentWorkoutComplete + "%",
      "Paused time": getHumanTime(props.pausedTime),
      "Total time": getHumanTime(props.totalTime),
    };
  }

  function generateStatsStr() {
    const stats = generateStatsObj();
    const statsStr = JSON.stringify(stats, null, 2);
    console.log(`Generated stats: ${statsStr}`);
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
    element.setAttribute("download", `workout-${props.workoutStartTime}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function saveStats() {
    const statsStr = localStorage.getItem("workoutHistory") || "[]";
    let stats = JSON.parse(statsStr);
    stats.unshift(generateStatsObj());
    localStorage.setItem("workoutHistory", JSON.stringify(stats));
    props.setHistoryUpdated(!props.historyUpdated);
  }

  function getHumanTime(time) {
    const date = new Date(null);
    date.setSeconds(time);
    return date.toISOString().slice(11, 19);
  }

  return (
    <div>
      <p>
        <b>Started:</b> {props.workoutStartTime}
      </p>
      <p>
        <b>Routine:</b> {props.currentWorkout.name}
      </p>
      <p>
        <b>Set:</b> {props.currentSet}/{props.currentWorkout.sets}
      </p>
      <p>
        <b>Completed:</b> {props.percentWorkoutComplete}%
      </p>
      <p>
        <b>Paused time:</b> {getHumanTime(props.pausedTime)}
      </p>
      <p>
        <b>Total time:</b> {getHumanTime(props.totalTime)}
      </p>

      <div style={{ textAlign: "right" }}>
        <IconButton onClick={() => copyStats()}>
          <ContentCopyIcon color="action" />
        </IconButton>
        <IconButton onClick={() => downloadStats()}>
          <SaveAltIcon color="action" />
        </IconButton>
        <IconButton onClick={() => saveStats()}>
          <SaveIcon color="action" />
        </IconButton>
      </div>
    </div>
  );
}
