import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  Box,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  useMediaQuery,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

import RoutineSelect from "./RoutineSelect";
import ClickRoutine from "./ClickRoutine";
import TimedRoutine from "./TimedRoutine";
import Controls from "./Controls";
import ExerciseList from "./ExerciseList";
import ExerciseVideo from "./ExerciseVideo";
import Timer from "./Timer";
import Stats from "./Stats";
import Finished from "./Finished";
import getModes from "./Modes";
import getRoutines from "./Routines";
import getExercises from "./Exercises";
import GetReady from "./GetReady";
import History from "./History";
import WeightHistory from "./WeightHistory";
import RepHistory from "./RepHistory";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...open,
}));

const mdTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function Index() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [modes] = useState(getModes());
  const [format, setFormat] = useState("series");
  const [routines, setRoutines] = useState(getRoutines(format));
  const [showRoutineSelectModal, setShowRoutineSelectModal] = useState(true);
  const exercises = getExercises();
  const routineHistory = JSON.parse(localStorage.getItem("workoutHistory"));
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [selectedReps, setSelectedReps] = useState(10);

  const [routineReset, setRoutineReset] = useState(false);
  const [routineRewind, setRoutineRewind] = useState(false);
  const [historyUpdated, setHistoryUpdated] = useState(false);
  const [currentMode, setCurrentMode] = useState(getModes()[0]);

  const [routinePaused, setRoutinePaused] = useState(false);
  const [routineStartTime, setRoutineStartTime] = useState("");
  const [routineStarted, setRoutineStarted] = useState(undefined);
  const [routineStopped, setRoutineStopped] = useState(undefined);
  const [routineFinished, setRoutineFinished] = useState(undefined);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [currentRoutine, setCurrentRoutine] = useState({
    spec: routines[0],
    phase: "ready",
    history: [],
    percentComplete: 0,
    lastSet: false,
  });

  const [timers, setTimers] = useState({
    total: 0,
    paused: 0,
    work: 0,
    rest: 0,
  });

  const [currentExercise, setCurrentExercise] = useState({
    index: 0,
    currentSet: 0,
    started: false,
  });

  const [set, setSet] = useState({
    isComplete: false,
    weight: null,
  });

  const countdownTime = 10;
  const debug =
    currentRoutine.spec.name === "Debug" ||
    window.location.hostname === "127.0.0.1"
      ? true
      : false;

  return (
    <ThemeProvider theme={mdTheme}>
      <AppBar position="absolute" open={true}>
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Workout Assistant
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setShowRoutineSelectModal(true)}
            startIcon={<FitnessCenterIcon />}
            disableElevation={false}
            sx={{
              mx: "auto",
              boxShadow: 1,
              ":hover": {
                backgroundColor: "secondary.dark",
                boxShadow: 6,
              },
              transition: "transform 0.2s",
              ":active": {
                transform: "scale(0.95)",
              },
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Reselect
          </Button>
        </Toolbar>

        <RoutineSelect
          debug={debug}
          exercises={exercises}
          routines={routines}
          currentRoutine={currentRoutine}
          setCurrentRoutine={setCurrentRoutine}
          isOpen={showRoutineSelectModal}
          onClose={() => setShowRoutineSelectModal(false)}
          routineHistory={routineHistory}
          selectedRoutine={selectedRoutine}
          setSelectedRoutine={setSelectedRoutine}
          modes={modes}
          currentMode={currentMode}
          setCurrentMode={setCurrentMode}
          format={format}
          setFormat={setFormat}
          onClickStart={() => setRoutineStarted(true)}
          isMobile={isMobile}
          setRoutines={setRoutines}
        />
      </AppBar>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            marginTop: "50px",
            height: "95vh",
            overflow: "auto",
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              mt: 4,
              mb: 4,
            }}
          >
            <Grid container spacing={0}>
              {/* Stats grid */}
              {selectedRoutine && (
                <Grid item xs={12} md={4} lg={3}>
                  <Box sx={{ m: 2 }}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                      }}
                    >
                      <Stats
                        currentSet={currentExercise.currentSet}
                        currentRoutine={currentRoutine}
                        currentExercise={currentExercise}
                        historyUpdated={historyUpdated}
                        setHistoryUpdated={setHistoryUpdated}
                        routineFinished={routineFinished}
                        routineStarted={routineStarted}
                        routineStartTime={routineStartTime}
                        setRoutineStartTime={setRoutineStartTime}
                        currentMode={currentMode}
                        format={format}
                        routineHistory={routineHistory}
                        debug={debug}
                        timers={timers}
                        setTimers={setTimers}
                      />
                    </Paper>
                  </Box>
                  <Box sx={{ m: 2 }}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        maxHeight: "250px",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          overflow: "auto",
                          maxHeight: "250px",
                        }}
                      >
                        <ExerciseList
                          exercises={exercises}
                          currentExercise={currentExercise}
                          currentRoutine={currentRoutine}
                          debug={debug}
                        />
                      </Box>
                    </Paper>
                  </Box>
                </Grid>
              )}

              {/* Center video grid */}
              {!routinePaused && (
                <Grid
                  item
                  xs={12}
                  md={selectedRoutine ? 4 : 12}
                  lg={selectedRoutine ? 6 : 12}
                  height="100%"
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      m: 2,
                    }}
                  >
                    <Paper
                      sx={{
                        p: isMobile ? 1 : 2,
                        pb: isMobile ? 0 : 2,
                        m: isMobile ? 0 : 2,
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "100%",
                      }}
                    >
                      <GetReady currentRoutine={currentRoutine} />
                      {selectedRoutine && (
                        <ExerciseVideo
                          currentRoutine={currentRoutine}
                          currentExercise={currentExercise}
                          routinePaused={routinePaused}
                          currentMode={currentMode}
                          exercises={exercises}
                          debug={debug}
                        />
                      )}
                      <Finished routineFinished={routineFinished} />
                    </Paper>
                  </Box>
                </Grid>
              )}
              {/* Controls & Timer grid */}
              {selectedRoutine && (
                <Grid item xs={12} md={4} lg={3}>
                  {currentMode.name !== "click" && (
                    <Box sx={{ m: 2 }}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Timer
                          debug={debug}
                          routinePaused={routinePaused}
                          routineStarted={routineStarted}
                          currentRoutine={currentRoutine}
                          countdownTime={countdownTime}
                          routineRewind={routineRewind}
                        />
                      </Paper>
                    </Box>
                  )}

                  {currentMode.name === "click" &&
                    currentRoutine.phase !== "ready" && (
                      <Box sx={{ m: 2 }}>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            style={{
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                            gutterBottom
                          >
                            Weight
                          </Typography>
                          <WeightHistory
                            debug={debug}
                            exercises={exercises}
                            currentRoutine={currentRoutine}
                            routineHistory={routineHistory}
                            currentExercise={currentExercise}
                            routineStarted={routineStarted}
                            routinePaused={routinePaused}
                            selectedWeight={selectedWeight}
                            setSelectedWeight={setSelectedWeight}
                          />
                        </Paper>
                      </Box>
                    )}
                  {currentMode.name === "click" &&
                    currentRoutine.phase !== "ready" && (
                      <Box sx={{ m: 2 }}>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            style={{
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                            gutterBottom
                          >
                            Reps
                          </Typography>
                          <RepHistory
                            debug={debug}
                            currentRoutine={currentRoutine}
                            routineHistory={routineHistory}
                            currentExercise={currentExercise}
                            routineStarted={routineStarted}
                            routinePaused={routinePaused}
                            exercises={exercises}
                            selectedReps={selectedReps}
                            setSelectedReps={setSelectedReps}
                          />
                        </Paper>
                      </Box>
                    )}
                  <Box sx={{ m: 2 }}>
                    <Paper
                      sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                      <Controls
                        routineStarted={routineStarted}
                        routinePaused={routinePaused}
                        currentRoutine={currentRoutine}
                        onClickPause={() => setRoutinePaused(true)}
                        onClickUnpause={() => setRoutinePaused(false)}
                        onClickStart={() => setRoutineStarted(true)}
                        onClickStop={() => setRoutineStopped(true)}
                        onClickReset={() => setRoutineReset(true)}
                        onClickRewind={() => setRoutineRewind(true)}
                        setSet={setSet}
                        currentMode={currentMode}
                      />
                    </Paper>
                  </Box>
                </Grid>
              )}

              {/* History grid */}
              {selectedRoutine && (
                <Grid item xs={12}>
                  <Box sx={{ m: 2 }}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        maxHeight: "500px",
                        overflow: "auto",
                      }}
                    >
                      <History
                        historyUpdated={historyUpdated}
                        setHistoryUpdated={setHistoryUpdated}
                      />
                    </Paper>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Container>
        </Box>
      </Box>

      {currentMode.name === "click" && (
        <ClickRoutine
          debug={debug}
          routineStarted={routineStarted}
          setRoutineStarted={setRoutineStarted}
          routineStopped={routineStopped}
          setRoutineStopped={setRoutineStopped}
          routineFinished={routineFinished}
          setRoutineFinished={setRoutineFinished}
          routineReset={routineReset}
          setRoutineReset={setRoutineReset}
          currentRoutine={currentRoutine}
          setCurrentRoutine={setCurrentRoutine}
          currentExercise={currentExercise}
          setCurrentExercise={setCurrentExercise}
          routinePaused={routinePaused}
          setRoutinePaused={setRoutinePaused}
          countdownTime={countdownTime}
          routineRewind={routineRewind}
          setRoutineRewind={setRoutineRewind}
          setRoutineStartTime={setRoutineStartTime}
          setCurrentMode={setCurrentMode}
          currentMode={currentMode}
          set={set}
          setSet={setSet}
          timers={timers}
          setTimers={setTimers}
          selectedWeight={selectedWeight}
          selectedReps={selectedReps}
        />
      )}
      {currentMode.name === "timer" && (
        <TimedRoutine
          debug={debug}
          routineStarted={routineStarted}
          setRoutineStarted={setRoutineStarted}
          routineStopped={routineStopped}
          setRoutineStopped={setRoutineStopped}
          routineFinished={routineFinished}
          setRoutineFinished={setRoutineFinished}
          routineReset={routineReset}
          setRoutineReset={setRoutineReset}
          currentRoutine={currentRoutine}
          setCurrentRoutine={setCurrentRoutine}
          currentExercise={currentExercise}
          setCurrentExercise={setCurrentExercise}
          routinePaused={routinePaused}
          setRoutinePaused={setRoutinePaused}
          countdownTime={countdownTime}
          routineRewind={routineRewind}
          setRoutineRewind={setRoutineRewind}
          setRoutineStartTime={setRoutineStartTime}
          setCurrentMode={setCurrentMode}
          currentMode={currentMode}
          set={set}
          setSet={setSet}
          timers={timers}
          setTimers={setTimers}
        />
      )}
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <Index />;
}

// ========================================
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(Dashboard());
