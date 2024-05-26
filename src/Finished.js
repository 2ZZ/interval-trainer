import { Typography } from "@mui/material";
import * as React from "react";

export default function Finished(props) {
  return (
    <div className="finishedTitle">
      {props.routineFinished !== undefined && props.routineFinished && (
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
            <h2>Finished!</h2>
          </Typography>
        </>
      )}
    </div>
  );
}
