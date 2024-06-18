import React, { useEffect, useRef } from "react";
import { createLogger } from "./utils";

export default function ExerciseList(props) {
  const { exercises, currentRoutine, currentExercise, debug } = props;
  const boldItemRef = useRef(null);
  const log = createLogger(debug);

  useEffect(() => {
    if (boldItemRef.current) {
      boldItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentExercise]);

  if (currentRoutine.phase === "ready") {
    log(`currentRoutine: ${JSON.stringify(currentRoutine)}`);
    return (
      <div className="exercise">
        <ul>
          {currentRoutine.spec.exercises
            .filter(
              (exercise, index, self) =>
                index === self.findIndex((e) => e === exercise)
            )
            .map((exerciseName, index) => {
              const exerciseDetails = exercises.find(
                (e) => e.name === exerciseName
              );

              const isBold =
                (currentExercise.index === undefined && index === 0) ||
                index === currentExercise.index - 1;

              return (
                <li
                  key={index}
                  ref={isBold ? boldItemRef : null}
                  style={{
                    fontWeight: isBold ? "bold" : "normal",
                  }}
                >
                  {(exerciseDetails.displayName &&
                    exerciseDetails.displayName) ||
                    exerciseDetails.name}
                </li>
              );
            })}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="exercise">
        <ul>
          {currentRoutine.spec.exercises.map((exerciseName, index) => {
            const exerciseDetails = exercises.find(
              (e) => e.name === exerciseName
            );
            const isBold =
              (currentExercise.index === undefined && index === 0) ||
              index === currentExercise.index - 1;

            return (
              <li
                key={index}
                ref={isBold ? boldItemRef : null}
                style={{
                  fontWeight: isBold ? "bold" : "normal",
                }}
              >
                {(exerciseDetails.displayName && exerciseDetails.displayName) ||
                  exerciseDetails.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
