import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect(props) {
  const [selectedRoutine, setSelectedRoutine] = React.useState(0);

  const handleChange = (event) => {
    setSelectedRoutine(event.target.value);
    props.setCurrentRoutine((currentRoutine) => ({
      ...currentRoutine,
      spec: props.routines[event.target.value],
    }));
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
          value={selectedRoutine}
          label="currentRoutine"
          onChange={handleChange}
          sx={{ color: "white" }}
        >
          {props.routines.map((routine, index) => {
            return (
              <MenuItem key={index} value={index}>
                {routine.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
