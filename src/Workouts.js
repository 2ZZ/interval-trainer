// Video source: https://musclewiki.com/

export default function getWorkouts() {
  return [
    {
      name: "Core Strength 1",
      sets: 4,
      workTime: 30,
      restTime: 30,
      exercises: [
        {
          name: "Squat",
          video: "male-barbell-pause-box-squat-front_GEhqEjs.mp4",
        },
        {
          name: "Shoulder Press",
          video: "male-dumbbell-overhead-press-front.mp4",
        },
        { name: "Alternative Lunges", video: "alternative-lunges.mp4" },
        { name: "Curls", video: "male-dumbbell-twisting-curl-front.mp4" },
        { name: "Floor to Ceiling Press", video: "floor-to-ceiling-press.mp4" },
        { name: "Goblet Squat", video: "male-dumbbell-goblet-squat-front.mp4" },
        {
          name: "Deadlift",
          video: "male-barbell-snatch-grip-deadlift-front.mp4",
        },
      ],
    },
    {
      name: "Core Strength 1 - Extended",
      sets: 2,
      workTime: 60,
      restTime: 60,
      exercises: [
        {
          name: "Squat",
          video: "male-barbell-pause-box-squat-front_GEhqEjs.mp4",
        },
        {
          name: "Shoulder Press",
          video: "male-dumbbell-overhead-press-front.mp4",
        },
        { name: "Alternative Lunges", video: "alternative-lunges.mp4" },
        { name: "Curls", video: "male-dumbbell-twisting-curl-front.mp4" },
        { name: "Floor to Ceiling Press", video: "floor-to-ceiling-press.mp4" },
        { name: "Goblet Squat", video: "male-dumbbell-goblet-squat-front.mp4" },
        {
          name: "Deadlift",
          video: "male-barbell-snatch-grip-deadlift-front.mp4",
        },
      ],
    },
    {
      name: "Core Strength 2",
      sets: 4,
      workTime: 35,
      restTime: 25,
      exercises: [
        { name: "Squat Press", video: "squat-press.mp4" },
        { name: "Press-up Row", video: "press-up-row.mp4" },
        { name: "Floor Fly", video: "male-dumbbell-chest-fly-side.mp4" },
        {
          name: "Lunge curl RH",
          video: "lunge-curl-lh.mp4",
        },
        {
          name: "Lunge curl LH",
          video: "lunge-curl-rh.mp4",
        },
        {
          name: "Burpee Deadlift",
          video: "burpee-deadlift.mp4",
        },
        { name: "Curls", video: "curls.mp4" },
      ],
    },
    {
      name: "Core Strength 3",
      sets: 4,
      workTime: 50,
      restTime: 30,
      exercises: [
        { name: "Press-up Row", video: "press-up-row.mp4" },
        { name: "Hammer Curl", video: "male-dumbbell-hammer-curl-front.mp4" },
        { name: "Split Squat", video: "male-dumbbell-split-squat-front.mp4" },
        {
          name: "Left Hand Row",
          video: "male-dumbbell-row-unilateral-side.mp4",
        },
        {
          name: "Right Hand Row",
          video: "male-dumbbell-row-unilateral-side.mp4",
        },
        { name: "Floor Fly", video: "male-dumbbell-chest-fly-side.mp4" },
      ],
    },
    {
      name: "Debug",
      sets: 2,
      workTime: 5,
      restTime: 5,
      exercises: [
        { name: "Squat Press", video: "squat-press.mp4" },
        { name: "Press-up Row", video: "press-up-row.mp4" },
      ],
    },
  ];
}
