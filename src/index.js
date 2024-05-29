import * as React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import ModeSelect from "./ModeSelect";
import RoutineSelect from "./RoutineSelect";
import FormatSelect from "./FormatSelect";
import ClickRoutine from "./ClickRoutine";
import TimedRoutine from "./TimedRoutine";
import Nav from "./Nav";
import ExerciseList from "./ExerciseList";
import ExerciseVideo from "./ExerciseVideo";
import Timer from "./Timer";
import Stats from "./Stats";
import Finished from "./Finished";
import getModes from "./Modes";
import getRoutines from "./Routines";
import GetReady from "./GetReady";
import History from "./History";

// Top bar
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
  const [modes] = useState(getModes());
  const [format, setFormat] = useState("series");
  const [routines, setRoutines] = useState(getRoutines(format));
  const routineHistory = JSON.parse(localStorage.getItem("workoutHistory"));

  const [routineReset, setRoutineReset] = useState(false);
  const [routineRewind, setRoutineRewind] = useState(false);
  const [historyUpdated, setHistoryUpdated] = useState(false);
  const [currentMode, setCurrentMode] = useState(getModes()[0]);

  const [routinePaused, setRoutinePaused] = useState(undefined);
  const [routineStartTime, setRoutineStartTime] = useState("");
  const [routineStarted, setRoutineStarted] = useState(undefined);
  const [routineStopped, setRoutineStopped] = useState(undefined);
  const [routineFinished, setRoutineFinished] = useState(undefined);
  const [currentRoutine, setCurrentRoutine] = useState({
    spec: routines[0],
    phase: "ready",
    history: [],
    percentComplete: 0,
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
  const debug = currentRoutine.spec.name === "Debug" ? true : false;

  useEffect(() => {
    const updatedRoutines = getRoutines(format);
    const routineIndex = routines.findIndex(
      (routine) => routine === currentRoutine.spec
    );
    setRoutines(updatedRoutines);
    setCurrentRoutine((prevRoutine) => ({
      ...prevRoutine,
      spec: updatedRoutines[routineIndex],
    }));
  }, [format, routines, currentRoutine]);

  return (
    <div className="main">
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
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <AppBar position="absolute" open={true}>
            <Toolbar>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Routine Assistant
              </Typography>
              <ModeSelect
                modes={modes}
                currentMode={currentMode}
                setCurrentMode={setCurrentMode}
              />
              <RoutineSelect
                routines={routines}
                currentRoutine={currentRoutine}
                setCurrentRoutine={setCurrentRoutine}
              />
              <FormatSelect format={format} setFormat={setFormat} />
            </Toolbar>
          </AppBar>

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={0}>
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
                        historyUpdated={historyUpdated}
                        setHistoryUpdated={setHistoryUpdated}
                        routineFinished={routineFinished}
                        routineStarted={routineStarted}
                        routineStartTime={routineStartTime}
                        setRoutineStartTime={setRoutineStartTime}
                        currentMode={currentMode}
                        currentExercise={currentExercise}
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
                          currentExercise={currentExercise}
                          currentRoutine={currentRoutine}
                        />
                      </Box>
                    </Paper>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4} lg={6}>
                  <Box sx={{ m: 2 }}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <GetReady currentRoutine={currentRoutine} />
                      <ExerciseVideo
                        currentRoutine={currentRoutine}
                        currentExercise={currentExercise}
                        routinePaused={routinePaused}
                        currentMode={currentMode}
                      />
                      <Finished routineFinished={routineFinished} />
                    </Paper>
                  </Box>
                </Grid>

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
                  <Box sx={{ m: 2 }}>
                    <Paper
                      sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                      <Nav
                        routineStarted={routineStarted}
                        routinePaused={routinePaused}
                        currentRoutine={currentRoutine}
                        onClickPause={() => setRoutinePaused(true)}
                        onClickUnpause={() => setRoutinePaused(false)}
                        onClickStart={() => setRoutineStarted(true)}
                        onClickStop={() => setRoutineStopped(true)}
                        onClickReset={() => setRoutineReset(true)}
                        onClickRewind={() => setRoutineRewind(true)}
                        set={set}
                        setSet={setSet}
                        currentMode={currentMode}
                        routineHistory={routineHistory}
                        currentExercise={currentExercise}
                      />
                    </Paper>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ m: 2 }}>
                    <Paper
                      sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                      <History
                        historyUpdated={historyUpdated}
                        setHistoryUpdated={setHistoryUpdated}
                      />
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default function Dashboard() {
  return <Index />;
}

// ========================================
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(Dashboard());
