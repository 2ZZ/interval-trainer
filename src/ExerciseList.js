import React, { useEffect, useRef } from "react";

export default function ExerciseList({ currentRoutine, currentExercise }) {
  const exercises = currentRoutine.spec.exercises;
  const boldItemRef = useRef(null);

  useEffect(() => {
    if (boldItemRef.current) {
      boldItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentExercise]);

  return (
    <div className="exercise">
      <ul>
        {exercises.map((exercise, index) => {
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
              {exercise.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
