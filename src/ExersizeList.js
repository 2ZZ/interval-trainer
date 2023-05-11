import * as React from "react";

export default function ExerciseList(props) {
  let excersizeList = [];
  props.currentWorkout.exercises.forEach((excersize, index) => {
    excersizeList.push(excersize);
  });

  return (
    <div className="excersize">
      <ul>
        {excersizeList.map((excersize, index) => {
          return (props.currentExersize === undefined && index === 0) ||
            index === props.currentExersize - 1 ? (
            <li key={index}>
              <b>{excersize.name}</b>
            </li>
          ) : (
            <li key={index}>{excersize.name}</li>
          );
        })}
      </ul>
    </div>
  );
}
