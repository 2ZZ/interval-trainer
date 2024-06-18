import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { createLogger } from "./utils";

export default function BasicSelect(props) {
  const { debug, isMobile } = props;

  const [selectedMode, setSelectedMode] = React.useState(0);

  const log = createLogger(debug);

  const handleChange = (event) => {
    log(`Setting mode to ${event.target.value}`);
    setSelectedMode(event.target.value);
    props.setCurrentMode(props.modes[event.target.value]);
  };

  return (
    <Box
      sx={{
        width: 120,
        pl: isMobile ? 0 : 1,
        pr: isMobile ? 0 : 1,
        mb: 3,
        mr: isMobile ? 0 : 1,
        ml: isMobile ? 0 : 1,
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="select-label" sx={{ pt: 1 }}>
          Mode
        </InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={selectedMode}
          label="currentMode"
          onChange={handleChange}
          sx={{
            height: "100%",
            width: 120,
            padding: 0,
          }}
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
