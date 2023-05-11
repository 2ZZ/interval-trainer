import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect(props) {
  const [selectedWorkout, setSelectedWorkout] = React.useState(0);

  const handleChange = (event) => {
    console.log("Changing workout");
    setSelectedWorkout(event.target.value);
    props.setCurrentWorkout(props.workouts[event.target.value]);
  };

  return (
    <Box sx={{ minWidth: 120, p: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label" sx={{ color: "white", pt: 1 }}>
          Routine
        </InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={selectedWorkout}
          label="currentWorkout"
          onChange={handleChange}
          sx={{ color: "white" }}
        >
          {props.workouts.map((workout, index) => {
            return (
              <MenuItem key={index} value={index}>
                {workout.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
