import React, { useEffect, useState } from "react";
import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";

function CreateRoutine(props) {
  const { setRoutines, exercises } = props;
  const [numExercises, setNumExercises] = useState(6);
  const [routineExercises, setRoutineExercises] = useState([]);

  useEffect(() => {
    setRoutineExercises(
      Array(numExercises)
        .fill(null)
        .map((_, index) => {
          return { exercise: "", reps: 10, weight: 25 };
        })
    );
  }, [numExercises]);

  const handleNumExercisesChange = (event) => {
    const newNumExercises = parseInt(event.target.value, 10);
    setNumExercises(newNumExercises);
    const updatedRoutine = new Array(newNumExercises)
      .fill(null)
      .map((_, index) => {
        return (
          routineExercises[index] || { exercise: "", reps: 10, weight: 25 }
        );
      });
    setRoutineExercises(updatedRoutine);
  };

  const handleExerciseChange = (index, value) => {
    const newRoutine = [...routineExercises];
    const exerciseDetails = exercises.find((ex) => ex.name === value);
    newRoutine[index] = {
      ...newRoutine[index],
      exercise: value,
      reps: exerciseDetails.defaults.reps,
      weight: exerciseDetails.defaults.weight,
    };
    setRoutineExercises(newRoutine);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Routine created:", routineExercises);

    setRoutines((routines) => {
      const updatedRoutines = routines.map((routine) => {
        if (routine.id === 0) {
          // Custom
          return {
            ...routine,
            exercises: routineExercises,
          };
        }
        return routine;
      });
      return updatedRoutines;
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Create Your Routine
      </Typography>
      <TextField
        type="number"
        label="Number of Exercises"
        value={numExercises}
        onChange={handleNumExercisesChange}
        sx={{ mb: 2, width: "100%" }}
        inputProps={{ min: 1 }}
      />
      {routineExercises.map((item, index) => (
        <div key={index} style={{ marginBottom: 16 }}>
          <Select
            value={item.exercise || ""}
            onChange={(e) => handleExerciseChange(index, e.target.value)}
            displayEmpty
            fullWidth
            sx={{ mb: 1 }}
          >
            <MenuItem value="">
              <em>Select an Exercise</em>
            </MenuItem>
            {exercises.map((ex) => (
              <MenuItem key={ex.name} value={ex.name}>
                {ex.displayName}
              </MenuItem>
            ))}
          </Select>
        </div>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Save Routine
      </Button>
    </form>
  );
}

export default CreateRoutine;
