import React, { useEffect, useState, useMemo } from "react";
import {
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  ListItemText,
} from "@mui/material";

import { createLogger } from "./utils";
function CreateRoutine(props) {
  const { setRoutines, exercises, currentMode, debug, exerciseCounts } = props;
  const [numExercises, setNumExercises] = useState(6);
  const [routineExercises, setRoutineExercises] = useState([]);
  const [sets, setSets] = useState(4);
  const [workTime, setWorkTime] = useState(40);
  const [restTime, setRestTime] = useState(20);
  const log = createLogger(debug);

  const sortedExercises = useMemo(() => {
    return [...exercises].sort((a, b) => {
      const countA = exerciseCounts[a.name] || 0;
      const countB = exerciseCounts[b.name] || 0;
      return countB - countA;
    });
  }, [exercises, exerciseCounts]);

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
            disabled={currentMode.name !== "timer"}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            type="number"
            label="Rest Time (seconds)"
            value={restTime}
            onChange={(e) => setRestTime(parseInt(e.target.value, 10))}
            fullWidth
            disabled={currentMode.name !== "timer"}
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
                {sortedExercises.map((ex) => (
                  <MenuItem key={ex.name} value={ex.name}>
                    <Typography variant="body1" component="span">
                      {ex.displayName}
                      {exerciseCounts[ex.name] > 0 && (
                        <Typography
                          variant="body2"
                          component="span"
                          color="text.secondary"
                          sx={{ ml: 1, fontSize: "0.8em" }}
                        >
                          ({exerciseCounts[ex.name]})
                        </Typography>
                      )}
                    </Typography>
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
