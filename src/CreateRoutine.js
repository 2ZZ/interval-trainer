import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
} from "@mui/material";

import { createLogger } from "./utils";
function CreateRoutine(props) {
  const { setRoutines, exercises, debug } = props;
  const [numExercises, setNumExercises] = useState(6);
  const [routineExercises, setRoutineExercises] = useState([]);
  const [sets, setSets] = useState(4); // Default value for sets
  const [workTime, setWorkTime] = useState(40); // Default work time
  const [restTime, setRestTime] = useState(20); // Default rest time
  const log = createLogger(debug);

  useEffect(() => {
    setRoutineExercises((prevExercises) => {
      const newExercises = [...prevExercises];
      if (numExercises > prevExercises.length) {
        for (let i = prevExercises.length; i < numExercises; i++) {
          newExercises.push({ exercise: "", reps: 10, weight: 25 });
        }
      } else {
        newExercises.length = numExercises;
      }
      return newExercises;
    });
  }, [numExercises]);

  const handleNumExercisesChange = (event) => {
    setNumExercises(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    const saveRoutine = () => {
      setRoutines((routines) => {
        const updatedRoutines = routines.map((routine) => {
          if (routine.id === 0) {
            return {
              ...routine,
              sets: sets,
              time: { work: workTime, rest: restTime },
              exercises: routineExercises.map((e) => e.exercise),
            };
          }
          return routine;
        });
        log(`updatedRoutines: ${JSON.stringify(updatedRoutines)}`);
        return updatedRoutines;
      });
    };
    saveRoutine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sets, workTime, restTime, routineExercises, setRoutines]);

  return (
    <form>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Create Your Routine
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            type="number"
            label="Number of Sets"
            value={sets}
            onChange={(e) => setSets(parseInt(e.target.value, 10))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            type="number"
            label="Work Time (seconds)"
            value={workTime}
            onChange={(e) => setWorkTime(parseInt(e.target.value, 10))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            type="number"
            label="Rest Time (seconds)"
            value={restTime}
            onChange={(e) => setRestTime(parseInt(e.target.value, 10))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="number"
            label="Number of Exercises"
            value={numExercises}
            onChange={handleNumExercisesChange}
            fullWidth
            InputProps={{ inputProps: { min: 1 } }}
          />
        </Grid>
        {routineExercises.map((item, index) => (
          <Grid item xs={12} key={index}>
            <FormControl fullWidth>
              <InputLabel id={`exercise-select-label-${index}`}>
                Select an Exercise
              </InputLabel>
              <Select
                labelId={`exercise-select-label-${index}`}
                value={item.exercise || ""}
                onChange={(e) =>
                  setRoutineExercises((exs) => {
                    const newExercises = [...exs];
                    newExercises[index] = {
                      ...newExercises[index],
                      exercise: e.target.value,
                    };
                    return newExercises;
                  })
                }
                displayEmpty
                fullWidth
                label="Select an Exercise"
              >
                <MenuItem value=""></MenuItem>
                {exercises.map((ex) => (
                  <MenuItem key={ex.name} value={ex.name}>
                    {ex.displayName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </form>
  );
}

export default CreateRoutine;
