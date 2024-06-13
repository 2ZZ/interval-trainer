import React from "react";
import "./index.css";
import { Box, Typography } from "@mui/material";

// Dangerous HTML due to video bug: https://github.com/facebook/react/issues/10389

export default function ExerciseVideo(props) {
  const {
    currentMode,
    currentRoutine,
    currentExercise,
    routinePaused,
    exercises,
  } = props;

  const currentExerciseIndex =
    currentExercise.index > 0
      ? currentExercise.index - 1
      : currentExercise.index;
  const nextExerciseIndex =
    currentExerciseIndex === currentRoutine.spec.exercises.length - 1
      ? 0
      : currentExerciseIndex + 1;

  const currentExerciseName =
    currentRoutine.spec.exercises[currentExerciseIndex] ?? "";
  const nextExerciseName =
    currentRoutine.spec.exercises[nextExerciseIndex] ?? "";

  const currentExerciseDetails = exercises.find(
    (e) => e.name === currentExerciseName
  );

  const nextExerciseDetails = exercises.find(
    (e) => e.name === nextExerciseName
  );

  let video = "";
  if (currentRoutine.phase === "rest") {
    video = nextExerciseDetails?.video ?? "nextExerciseVideonotfound";
  } else if (currentRoutine.phase === "work") {
    video = currentExerciseDetails?.video ?? "currentExerciseVideonotfoundWork";
  } else if (currentMode.name === "click") {
    video =
      currentExerciseDetails?.video ?? "currentExerciseVideonotfoundClick";
  }

  if (!video.startsWith("http")) {
    video = `/interval-trainer/static/videos/${video}`;
  }

  let overlayText = "";
  if (routinePaused) {
    overlayText = "Paused";
  } else if (currentRoutine.phase === "rest") {
    overlayText = `Upcoming: ${nextExerciseName}`;
  } else if (currentRoutine.phase === "work") {
    overlayText = currentExerciseName;
  }

  let HTML;
  if (currentExercise.started && !routinePaused) {
    return (
      <div sx={{ position: "relative", textAlign: "center" }}>
        <div
          dangerouslySetInnerHTML={{
            __html: `
          <video
            loop
            muted
            autoplay
            playsinline
            width="100%"
            src="${video}"
            type="video/mp4"
          />
            `,
          }}
        />
        <div className="video-overlay">
          <h2>{overlayText}</h2>
        </div>
      </div>
    );
  } else {
    return (
      <Box>
        <Typography
          component={"span"}
          sx={{
            p: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "secondary.main",
          }}
        >
          <h2>Click START to begin</h2>
        </Typography>
      </Box>
    );
  }
}
