import React, { useEffect, useMemo } from "react";
import Modal from "./Modal";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { orange, red, green } from "@mui/material/colors";
import { Card, Box, Button, Divider } from "@mui/material";

import ModeSelect from "./ModeSelect";
import FormatSelect from "./FormatSelect";
import RoutineDetails from "./RoutineDetails";
import CreateRoutine from "./CreateRoutine";

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
    onClickStart,
    isMobile,
    setRoutines,
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
    onClickStart();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isMobile={isMobile}>
      <Box
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: "100%",
          maxHeight: isMobile ? "90vh" : "80vh",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            flex: 1,
            borderRight: isMobile ? "none" : "1px solid gray",
            borderBottom: isMobile ? "1px solid gray" : "none",
            padding: "10px",
            overflowY: "auto",
            height: "90%",
          }}
        >
          {sortedRoutines.map((routine) => (
            <Box
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
            </Box>
          ))}
        </Box>
        <Box
          style={{
            flex: 3,
            padding: isMobile ? "0px" : "10px",
            overflowY: "auto",
          }}
        >
          {selectedRoutine ? (
            <>
              <Box
                sx={{
                  margin: isMobile ? "0px" : "10px",
                  padding: "10px",
                  overflowY: "auto",
                  height: "90%",
                }}
              >
                <Card
                  raised
                  sx={{
                    margin: "10px 0",
                    padding: "10px",
                    overflowY: "auto",
                  }}
                >
                  {(selectedRoutine.id === 0 && (
                    <CreateRoutine
                      setRoutines={setRoutines}
                      exercises={exercises}
                      setSelectedRoutine={setSelectedRoutine}
                    />
                  )) || <RoutineDetails selectedRoutine={selectedRoutine} />}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      justifyContent: isMobile ? "center" : "right",
                      alignItems: "center",
                      ml: 3,
                      mr: 3,
                      mb: 3,
                      mt: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0,
                        "@media (max-width: 600px)": {
                          flexDirection: "column",
                        },
                      }}
                    >
                      <Box sx={{ width: "100%", mb: 3 }}>
                        <Divider />
                      </Box>
                      <ModeSelect
                        modes={modes}
                        currentMode={currentMode}
                        setCurrentMode={setCurrentMode}
                        isMobile={isMobile}
                      />
                      <FormatSelect
                        format={format}
                        setFormat={setFormat}
                        isMobile={isMobile}
                      />
                      <Box sx={{ width: "100%", mb: 3 }}>
                        <Divider />
                      </Box>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={onConfirm}
                        sx={{
                          height: "100%",
                          width: 120,
                          minHeight: 55,
                          pl: isMobile ? 0 : 1,
                          pr: isMobile ? 0 : 1,
                          mb: 0,
                          mr: isMobile ? 0 : 1,
                          ml: isMobile ? 0 : 2,
                        }}
                      >
                        START
                      </Button>
                    </Box>
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
        </Box>
      </Box>
    </Modal>
  );
};

export default RoutineSelector;
