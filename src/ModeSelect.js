import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect(props) {
  const [selectedMode, setSelectedMode] = React.useState(0);

  const handleChange = (event) => {
    setSelectedMode(event.target.value);
    props.setCurrentMode(props.modes[event.target.value]);
  };

  return (
    <Box sx={{ minWidth: 120, p: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label" sx={{ color: "white", pt: 1 }}>
          Mode
        </InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={selectedMode}
          label="currentMode"
          onChange={handleChange}
          sx={{ color: "white" }}
        >
          {props.modes.map((mode, index) => {
            return (
              <MenuItem key={index} value={index}>
                {mode.displayName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
