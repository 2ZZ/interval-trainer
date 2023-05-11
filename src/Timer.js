import * as React from "react";
import ReactCountdownClock from "react-countdown-clock";

export default class Timer extends React.Component {
  render() {
    let time = 0;
    let colour;
    if (this.props.workoutPhase === "ready") {
      colour = "blue";
    } else if (this.props.workoutPhase === "work") {
      colour = "red";
      time = this.props.currentWorkout.workTime;
    } else if (this.props.workoutPhase === "rest") {
      colour = "green";
      time = this.props.currentWorkout.restTime;
    } else if (this.props.workoutPhase === "countdown") {
      time = this.props.countdownTime;
      colour = "blue";
    }

    const divStyle = {
      position: "relative",
    };

    let paused = false;
    if (this.props.workoutPaused) {
      paused = true;
    } else if (!this.props.workoutStarted) {
      paused = true;
    }
    return (
      <div style={divStyle}>
        <ReactCountdownClock
          key={
            this.props.workoutPhase + "" + time + "" + this.props.workoutRewind
          }
          seconds={time}
          color={colour}
          alpha={0.9}
          size={200}
          onComplete={() => {
            console.log("Timer complete");
          }}
          paused={paused}
        />
      </div>
    );
  }
}
