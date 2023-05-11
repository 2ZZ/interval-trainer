import * as React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import RoutineSelect from "./RoutineSelect";
import Workout from "./Workout";
import Nav from "./Nav";
import ExersizeList from "./ExersizeList";
import ExersizeVideo from "./ExersizeVideo";
import Timer from "./Timer";
import Stats from "./Stats";
import Finished from "./Finished";
import getWorkouts from "./Workouts";
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

function Index(props) {
  const [workouts] = useState(getWorkouts());
  const [workoutStarted, setWorkoutStarted] = useState(undefined);
  const [workoutStopped, setWorkoutStopped] = useState(undefined);
  const [workoutFinished, setWorkoutFinished] = useState(undefined);
  const [workoutReset, setWorkoutReset] = useState(false);
  const [exerciseStarted, setExerciseStarted] = useState(false);
  const [workoutRewind, setWorkoutRewind] = useState(false);
  const [historyUpdated, setHistoryUpdated] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState(getWorkouts()[0]);
  const [currentExersize, setCurrentExersize] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [workTime, setWorkTime] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [workoutPhase, setWorkoutPhase] = useState("ready");
  const [workoutPaused, setWorkoutPaused] = useState(undefined);
  const [totalTime, setTotalTime] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);
  const [percentWorkoutComplete, setPercentWorkoutComplete] = useState(0);
  const [workoutStartTime, setWorkoutStartTime] = useState("");

  const countdownTime = 10;
  const debug = currentWorkout.name === "Debug" ? true : false;

  return (
    <div className="main">
      <Workout
        debug={debug}
        workoutStarted={workoutStarted}
        setWorkoutStarted={setWorkoutStarted}
        workoutStopped={workoutStopped}
        setWorkoutStopped={setWorkoutStopped}
        workoutFinished={workoutFinished}
        setWorkoutFinished={setWorkoutFinished}
        workoutReset={workoutReset}
        setWorkoutReset={setWorkoutReset}
        currentWorkout={currentWorkout}
        setCurrentWorkout={setCurrentWorkout}
        currentSet={currentSet}
        setCurrentSet={setCurrentSet}
        currentExersize={currentExersize}
        setCurrentExersize={setCurrentExersize}
        workoutPhase={workoutPhase}
        setWorkoutPhase={setWorkoutPhase}
        workTime={workTime}
        setWorkTime={setWorkTime}
        restTime={restTime}
        setRestTime={setRestTime}
        workoutPaused={workoutPaused}
        setWorkoutPaused={setWorkoutPaused}
        totalTime={totalTime}
        setTotalTime={setTotalTime}
        pausedTime={pausedTime}
        setPausedTime={setPausedTime}
        exerciseStarted={exerciseStarted}
        setExerciseStarted={setExerciseStarted}
        countdownTime={countdownTime}
        setPercentWorkoutComplete={setPercentWorkoutComplete}
        workoutRewind={workoutRewind}
        setWorkoutRewind={setWorkoutRewind}
        setWorkoutStartTime={setWorkoutStartTime}
      />
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
                Interval Trainer
              </Typography>
              <RoutineSelect
                workouts={workouts}
                currentWorkout={currentWorkout}
                setCurrentWorkout={setCurrentWorkout}
              />
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
                        currentSet={currentSet}
                        totalTime={totalTime}
                        pausedTime={pausedTime}
                        workoutPhase={workoutPhase}
                        currentWorkout={currentWorkout}
                        percentWorkoutComplete={percentWorkoutComplete}
                        historyUpdated={historyUpdated}
                        setHistoryUpdated={setHistoryUpdated}
                        workoutFinished={workoutFinished}
                        workoutStarted={workoutStarted}
                        workoutStartTime={workoutStartTime}
                        setWorkoutStartTime={setWorkoutStartTime}
                      />
                    </Paper>
                  </Box>
                  <Box sx={{ m: 2 }}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <ExersizeList
                        currentExersize={currentExersize}
                        currentWorkout={currentWorkout}
                      />
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
                      <GetReady workoutPhase={workoutPhase} />
                      <ExersizeVideo
                        // debug={debug}
                        currentExersize={currentExersize}
                        currentWorkout={currentWorkout}
                        exerciseStarted={exerciseStarted}
                        workoutPaused={workoutPaused}
                        workoutPhase={workoutPhase}
                      />
                      <Finished workoutFinished={workoutFinished} />
                    </Paper>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
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
                        workoutPhase={workoutPhase}
                        workTime={workTime}
                        restTime={restTime}
                        workoutPaused={workoutPaused}
                        workoutStarted={workoutStarted}
                        currentWorkout={currentWorkout}
                        countdownTime={countdownTime}
                        workoutRewind={workoutRewind}
                      />
                    </Paper>
                  </Box>
                  <Box sx={{ m: 2 }}>
                    <Paper
                      sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                      <Nav
                        workoutStarted={workoutStarted}
                        workoutPaused={workoutPaused}
                        workoutPhase={workoutPhase}
                        workTime={workTime}
                        restTime={restTime}
                        currentWorkout={currentWorkout}
                        onClickPause={() => setWorkoutPaused(true)}
                        onClickUnpause={() => setWorkoutPaused(false)}
                        onClickStart={() => setWorkoutStarted(true)}
                        onClickStop={() => setWorkoutStopped(true)}
                        onClickReset={() => setWorkoutReset(true)}
                        onClickRewind={() => setWorkoutRewind(true)}
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
