import React from "react";
import "./index.css";

// Dangerous HTML due to video bug: https://github.com/facebook/react/issues/10389

export default function ExerciseVideo(props) {
  const { currentMode, currentRoutine, currentExercise, exercises } = props;

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
    </div>
  );
}
