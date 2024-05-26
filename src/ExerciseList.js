import * as React from "react";

export default function ExerciseList(props) {
  let excercizeList = [];
  props.currentRoutine.spec.exercises.forEach((excercize, index) => {
    excercizeList.push(excercize);
  });

  return (
    <div className="excercize">
      <ul>
        {excercizeList.map((excercize, index) => {
          return (props.currentExercise.index === undefined && index === 0) ||
            index === props.currentExercise.index - 1 ? (
            <li key={index}>
              <b>{excercize.name}</b>
            </li>
          ) : (
            <li key={index}>{excercize.name}</li>
          );
        })}
      </ul>
    </div>
  );
}
