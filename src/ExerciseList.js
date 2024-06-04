import React, { useEffect, useRef } from "react";

export default function ExerciseList(props) {
  const { exercises, currentRoutine, currentExercise } = props;
  const boldItemRef = useRef(null);

  useEffect(() => {
    if (boldItemRef.current) {
      boldItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentExercise]);

  if (currentRoutine.phase === "ready") {
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
                  {exerciseDetails.displayName}
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
                {exerciseDetails.displayName}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
