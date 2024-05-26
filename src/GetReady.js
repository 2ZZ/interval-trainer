import { Typography } from "@mui/material";
import * as React from "react";

export default function GetReady(props) {
  return (
    <div>
      {props.currentRoutine.phase === "countdown" && (
        <>
          <Typography
            component={"span"}
            sx={{
              p: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>Get Ready!</h2>
          </Typography>
        </>
      )}
    </div>
  );
}
