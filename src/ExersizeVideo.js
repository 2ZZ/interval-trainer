import React from "react";
import "./index.css";

// Dangerous HTML due to video bug: https://github.com/facebook/react/issues/10389

export default function ExersizeVideo(props) {
  function log(msg) {
    if (props.debug) {
      console.log(msg);
    }
  }
  const placeholderImage =
    "static/images/iad_Exersize._Weight_Lifting._Fitness._Blended_with_binary_cod_7427d93c-c4da-4880-814d-551bf85b5820.png";
  const currentExersizeIndex = props.currentExersize - 1;
  const nextExersizeIndex =
    props.currentExersize === props.currentWorkout.exercises.length
      ? 0
      : props.currentExersize;

  if (
    props.currentExersize !== undefined &&
    typeof props.currentWorkout.exercises[currentExersizeIndex] !==
      "undefined" &&
    props.workoutPhase !== "finished" &&
    props.workoutPhase !== "ready" &&
    props.workoutPhase !== "countdown"
  ) {
    const currentExersizeVideo =
      props.currentWorkout.exercises[currentExersizeIndex].video;
    const nextExersizeVideo =
      props.currentWorkout.exercises[nextExersizeIndex].video;
    const currentExersizeName =
      props.currentWorkout.exercises[currentExersizeIndex].name;
    const nextExersizeName =
      props.currentWorkout.exercises[nextExersizeIndex].name;

    let videoFile = "";
    if (props.workoutPhase === "rest") {
      videoFile = nextExersizeVideo;
    } else if (props.workoutPhase === "work") {
      videoFile = currentExersizeVideo;
    }

    let overlayText = "";
    if (props.workoutPaused) {
      overlayText = "Paused";
    } else if (props.workoutPhase === "rest") {
      overlayText = `Upcoming: ${nextExersizeName}`;
    } else if (props.workoutPhase === "work") {
      overlayText = currentExersizeName;
    }

    let videoHTML;
    if (props.exerciseStarted && !props.workoutPaused) {
      videoHTML = `
<video
  loop
  muted
  autoplay
  playsinline
  width="100%"
  src="static/videos/${videoFile}"
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
  src="static/videos/${videoFile}"
  type="video/mp4"
/>
  `;
    }

    return (
      <div className="exersizeAnimation">
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
    log("Not running video, currentExersizeIndex: " + currentExersizeIndex);
    if (props.workoutPhase !== "countdown") {
      return (
        <div className="exersizeAnimation">
          <img width="100%" src={placeholderImage} alt="Homepage" />
        </div>
      );
    }
  }
}
