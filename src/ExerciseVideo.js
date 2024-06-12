import React from "react";
import "./index.css";

import { createLogger } from "./utils";

// Dangerous HTML due to video bug: https://github.com/facebook/react/issues/10389

export default function ExerciseVideo(props) {
  const {
    currentMode,
    currentRoutine,
    currentExercise,
    routinePaused,
    exercises,
    debug,
  } = props;

  const log = createLogger(debug);
  const placeholderImage = "/interval-trainer/static/images/logo.webp";

  if (["countdown", "rest", "work"].includes(currentRoutine.phase)) {
    const currentExerciseIndex = currentExercise.index - 1;
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
      video = currentExerciseDetails?.video ?? "currentExerciseVideonotfound";
    } else if (currentMode.name === "click") {
      video = currentExerciseDetails?.video ?? "currentExerciseVideonotfound";
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

    let videoHTML;
    if (currentExercise.started && !routinePaused) {
      videoHTML = `
<video
  loop
  muted
  autoplay
  playsinline
  width="100%"
  src="${video}"
  type="video/mp4"
/>
  `;
    } else {
      videoHTML = `
<video
  loop
  muted
  playsinline
  width="100%"
  src="${video}"
  type="video/mp4"
/>
  `;
    }

    return (
      <div className="exerciseAnimation">
        <div
          dangerouslySetInnerHTML={{
            __html: videoHTML,
          }}
        />
        <div className="video-overlay">
          <h2>{overlayText}</h2>
        </div>
      </div>
    );
  } else {
    if (
      currentRoutine &&
      currentRoutine.phase !== "countdown" &&
      currentRoutine.phase !== "finished"
    ) {
      return <div className="exerciseAnimation">Click START to begin</div>;
    }
  }
}
