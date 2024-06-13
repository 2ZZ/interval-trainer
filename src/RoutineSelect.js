import React, { useEffect, useState, useMemo } from "react";
import Modal from "./Modal";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { orange, red, green } from "@mui/material/colors";
import { Card, Typography, Box, Button, Link } from "@mui/material";

import ModeSelect from "./ModeSelect";
import FormatSelect from "./FormatSelect";

const RoutineSelector = (props) => {
  const {
    isOpen,
    onClose,
    exercises,
    routines,
    setCurrentRoutine,
    routineHistory,
    selectedRoutine,
    setSelectedRoutine,
    modes,
    currentMode,
    setCurrentMode,
    format,
    setFormat,
  } = props;

  const getUsageCount = (routineName) => {
    if (!routineHistory) {
      return 0;
    }
    return routineHistory.filter((r) => r.Routine === routineName).length;
  };

  const getRoutineDetails = (routineName) => {
    if (!routineHistory) {
      return {
        lastDate: "Never",
        timesCompleted: 0,
        lastTimeTaken: "N/A",
        lastMode: "N/A",
      };
    }

    const history = routineHistory.filter((r) => r.Routine === routineName);
    const lastEntry = history.reduce(
      (prev, current) =>
        new Date(prev.Date) > new Date(current.Date) ? prev : current,
      { Date: "1900-01-01" }
    );

    return {
      lastDate: lastEntry.Date
        ? new Date(lastEntry.Date).toLocaleDateString()
        : "Never",
      timesCompleted: history.length,
      lastTimeTaken: lastEntry["Total time"] || "N/A",
      lastMode: lastEntry.Mode || "N/A",
    };
  };

  const sortedRoutines = useMemo(() => {
    const exerciseMap = new Map(exercises.map((ex) => [ex.name, ex]));

    return routines
      .map((routine) => ({
        ...routine,
        usageCount: getUsageCount(routine.name),
        exercises: [...new Set(routine.exercises)].map((exerciseName) => {
          const exerciseDetails = exerciseMap.get(exerciseName);
          return {
            name: exerciseName,
            ...exerciseDetails,
          };
        }),
      }))
      .sort((a, b) => b.usageCount - a.usageCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routines, exercises, routineHistory]);

  const onSelect = (routine) => {
    const details = getRoutineDetails(routine.name);
    setSelectedRoutine({
      ...routine,
      ...details,
    });
  };

  const onConfirm = () => {
    setCurrentRoutine((currentRoutine) => ({
      ...currentRoutine,
      spec: routines.find((r) => r.id === selectedRoutine.id),
    }));
    onClose();
  };

  const renderIcons = (count) => {
    let icons = [];
    if (count >= 50) {
      icons.push(<StarIcon key="high" style={{ color: red[500] }} />);
    } else if (count >= 25) {
      icons.push(<StarIcon key="medium" style={{ color: orange[500] }} />);
    } else if (count > 0) {
      icons.push(<StarBorderIcon key="low" style={{ color: green[500] }} />);
    } else {
      icons.push(<StarBorderIcon key="none" style={{ color: "lightgray" }} />);
    }
    return icons;
  };

  useEffect(() => {
    if (isOpen && sortedRoutines.length > 0 && selectedRoutine === null) {
      onSelect(sortedRoutines[0]);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          maxHeight: "80vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            flex: 1,
            borderRight: "1px solid gray",
            padding: "10px",
            overflowY: "auto",
          }}
        >
          {sortedRoutines.map((routine) => (
            <div
              key={routine.id}
              onClick={() => onSelect(routine)}
              style={{
                cursor: "pointer",
                padding: "10px",
                borderBottom: "1px solid gray",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {routine.name}
              <div style={{ display: "flex", alignItems: "center" }}>
                {renderIcons(routine.usageCount)}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            flex: 3,
            padding: "10px",
            overflowY: "auto",
            paddingLeft: "50px",
          }}
        >
          {selectedRoutine ? (
            <>
              <Box>
                <Card
                  raised
                  style={{
                    margin: "10px 0",
                    padding: "10px",
                    overflowY: "auto",
                  }}
                >
                  <Typography
                    variant="h4"
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
                      {[...new Set(selectedRoutine.exercises)].map(
                        (exercise, index) => {
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
                        }
                      )}
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "right",
                      alignItems: "center", // Added to vertically center the button
                      ml: 3,
                      mr: 3,
                      mb: 3,
                      mt: 3,
                    }}
                  >
                    <ModeSelect
                      modes={modes}
                      currentMode={currentMode}
                      setCurrentMode={setCurrentMode}
                    />
                    <FormatSelect format={format} setFormat={setFormat} />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onConfirm}
                      sx={{ height: "100%" }}
                    >
                      Select
                    </Button>
                  </Box>
                </Card>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                ml: 3,
                mr: 3,
                mb: 3,
                mt: 3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <ArrowBackIosIcon sx={{ mr: 1 }} />
              Select a workout to see the details.
            </Box>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RoutineSelector;
