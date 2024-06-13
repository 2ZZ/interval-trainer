import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect(props) {
  const { format, setFormat } = props;

  const handleChange = (event) => {
    setFormat(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, p: 1, pr: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label" sx={{ pt: 1 }}>
          Format
        </InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={format}
          label="format"
          onChange={handleChange}
        >
          {["series", "circuit"].map((format, index) => {
            return (
              <MenuItem key={index} value={format}>
                {format.charAt(0).toUpperCase() + format.slice(1)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
