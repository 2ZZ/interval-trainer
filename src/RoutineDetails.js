import React from "react";
import { Typography, Link } from "@mui/material";

function RoutineDetails({ selectedRoutine }) {
  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        {selectedRoutine.name}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          ml: 3,
        }}
      >
        Exercises
      </Typography>
      <Typography
        color="text.secondary"
        sx={{
          ml: 3,
        }}
        component="div"
      >
        <ul>
          {[...new Set(selectedRoutine.exercises)].map((exercise, index) => {
            let video = exercise.video;
            if (!video?.startsWith("http")) {
              video = `/interval-trainer/static/videos/${video}`;
            }
            return (
              <li key={index}>
                <Link
                  href={video}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  {exercise.displayName}
                </Link>
              </li>
            );
          })}
        </ul>
      </Typography>
      {selectedRoutine.timesCompleted > 0 && (
        <div>
          <Typography
            variant="h6"
            sx={{
              ml: 3,
            }}
          >
            Stats
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              ml: 3,
            }}
            component="div"
          >
            <ul>
              <li>
                <Typography>
                  Last completed: {selectedRoutine.lastDate}
                </Typography>
              </li>
              <li>
                <Typography>
                  Times completed: {selectedRoutine.timesCompleted}
                </Typography>
              </li>
              <li>
                <Typography>
                  Last time taken: {selectedRoutine.lastTimeTaken}
                </Typography>
              </li>
              <li>
                <Typography>
                  Last mode used: {selectedRoutine.lastMode}
                </Typography>
              </li>
            </ul>
          </Typography>
        </div>
      )}
    </>
  );
}

export default RoutineDetails;
