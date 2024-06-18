import React from "react";
import "./index.css";

export default function ExerciseVideo({
  currentMode,
  currentRoutine,
  currentExercise,
  exercises,
}) {
  const getExerciseIndex = (exercise) => {
    return exercise.index > 0 ? exercise.index - 1 : exercise.index;
  };

  const getNextExerciseIndex = (index, length) => {
    return index === length - 1 ? 0 : index + 1;
  };

  const getMediaDetails = (exerciseName) => {
    return exercises.find((e) => e.name === exerciseName);
  };

  const getMediaSource = (details, phase, mode) => {
    let media = {
      source: details?.video || details?.image,
      type: details?.video ? "video" : "image",
    };

    if (media.source && !media.source.startsWith("http")) {
      media.source = `/interval-trainer/static/${media.type}s/${media.source}`;
    }

    return media;
  };

  const currentExerciseIndex = getExerciseIndex(currentExercise);
  const nextExerciseIndex = getNextExerciseIndex(
    currentExerciseIndex,
    currentRoutine.spec.exercises.length
  );

  const currentExerciseName =
    currentRoutine.spec.exercises[currentExerciseIndex] ?? "";
  const nextExerciseName =
    currentRoutine.spec.exercises[nextExerciseIndex] ?? "";

  const currentExerciseDetails = getMediaDetails(currentExerciseName);
  const nextExerciseDetails = getMediaDetails(nextExerciseName);

  const media =
    currentRoutine.phase === "rest"
      ? getMediaSource(
          nextExerciseDetails,
          currentRoutine.phase,
          currentMode.name
        )
      : getMediaSource(
          currentExerciseDetails,
          currentRoutine.phase,
          currentMode.name
        );

  return (
    <div sx={{ position: "relative", textAlign: "center" }}>
      <div
        dangerouslySetInnerHTML={{
          __html:
            media.type === "video"
              ? `<video loop muted autoplay playsinline width="100%" src="${media.source}" type="video/mp4" />`
              : `<img src="${media.source}" alt="${currentExerciseName}" width="100%" />`,
        }}
      />
    </div>
  );
}
