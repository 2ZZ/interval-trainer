import React from "react";
import "./index.css";

// Dangerous HTML due to video bug: https://github.com/facebook/react/issues/10389

export default function ExerciseVideo(props) {
  const { currentMode, currentRoutine, currentExercise } = props;

  const placeholderImage =
    "static/images/iad_Exersize._Weight_Lifting._Fitness._Blended_with_binary_cod_7427d93c-c4da-4880-814d-551bf85b5820.png";

  if (["countdown", "rest", "work"].includes(currentRoutine.phase)) {
    const currentExerciseIndex = currentExercise.index - 1;
    const nextExerciseIndex =
      currentExerciseIndex === currentRoutine.spec.exercises.length - 1
        ? 0
        : currentExerciseIndex + 1;
    const currentExerciseVideo =
      currentRoutine.spec.exercises[currentExerciseIndex]?.video ??
      "currentExerciseVideonotfound";
    const nextExerciseVideo =
      currentRoutine.spec.exercises[nextExerciseIndex]?.video ??
      "nextExerciseVideonotfound";
    const currentExerciseName =
      currentRoutine.spec.exercises[currentExerciseIndex]?.name ?? "";
    const nextExerciseName =
      currentRoutine.spec.exercises[nextExerciseIndex]?.name ?? "";

    let video = "";
    if (currentRoutine.phase === "rest") {
      video = nextExerciseVideo;
    } else if (currentRoutine.phase === "work") {
      video = currentExerciseVideo;
    } else if (currentMode.name === "click") {
      video = currentExerciseVideo;
    }

    if (!video.startsWith("http")) {
      video = `static/videos/${video}`;
    }

    let overlayText = "";
    if (props.routinePaused) {
      overlayText = "Paused";
    } else if (currentRoutine.phase === "rest") {
      overlayText = `Upcoming: ${nextExerciseName}`;
    } else if (currentRoutine.phase === "work") {
      overlayText = currentExerciseName;
    }

    overlayText =
      overlayText +
      ` (${currentExerciseIndex + 1} / ${
        currentRoutine.spec.exercises.length
      })`;
    let videoHTML;
    if (currentExercise.started && !props.routinePaused) {
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
    if (currentRoutine && currentRoutine.phase !== "countdown") {
      return (
        <div className="exerciseAnimation">
          <img width="100%" src={placeholderImage} alt="Homepage" />
        </div>
      );
    }
  }
}
