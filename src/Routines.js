// Video source: https://musclewiki.com/

export default function getRoutines(format) {
  const routines = [
    {
      id: 0,
      name: "Custom",
      sets: 4,
      time: {
        work: 40,
        rest: 20,
      },
      exercises: [],
    },
    {
      id: 2,
      name: "Balanced 1",
      sets: 4,
      time: {
        work: 40,
        rest: 20,
      },
      exercises: [
        "one-leg-dumbbell-squat-left",
        "one-leg-dumbbell-squat-right",
        "shoulder-press",
        "floor-fly",
        "dumbbell-situp",
        "forward-lunges",
      ],
    },
    {
      id: 3,
      name: "Balanced 2",
      sets: 4,
      time: {
        work: 40,
        rest: 20,
      },
      exercises: [
        "goblet-squat",
        "dumbbell-situp",
        "press-up",
        "hammer-curl",
        "overhead-press",
        "calf-raise",
      ],
    },
    {
      id: 4,
      name: "Balanced 3",
      sets: 4,
      time: {
        work: 40,
        rest: 20,
      },
      exercises: [
        "overhead-press",
        "hammer-curl",
        "one-leg-dumbbell-squat",
        "left-hand-row",
        "right-hand-row",
        "dumbbell-stiff-legged-deadlift",
      ],
    },
    {
      id: 5,
      name: "Balanced 4",
      sets: 4,
      time: {
        work: 40,
        rest: 20,
      },
      exercises: [
        "dumbbell-skullcrusher-tricep-extension",
        "lateral-raise",
        "dumbbell-rear-delt-fly",
        "curls",
        "overhead-press",
        "alternative-lunges",
      ],
    },
    {
      id: 6,
      name: "Legs 1",
      sets: 4,
      time: {
        work: 40,
        rest: 20,
      },
      exercises: [
        "squat",
        "alternative-lunges",
        "goblet-squat",
        "deadlift",
        "split-squat",
        "dumbbell-stiff-legged-deadlift",
      ],
    },
    {
      id: 7,
      name: "Legs 2",
      sets: 4,
      time: {
        work: 40,
        rest: 20,
      },
      exercises: [
        "squat",
        "burpee-deadlift",
        "calf-raise",
        "alternative-lunges",
        "goblet-squat",
        "split-squat",
      ],
    },
    {
      id: 8,
      name: "Arms 1",
      sets: 4,
      time: {
        work: 40,
        rest: 20,
      },
      exercises: [
        "shoulder-press",
        "curls",
        "diamond-pushups",
        "hammer-curl",
        "wrist-curl",
        "dumbbell-skullcrusher-tricep-extension",
      ],
    },
    {
      id: 9,
      name: "Arms 2",
      sets: 4,
      time: {
        work: 40,
        rest: 20,
      },
      exercises: [
        "shoulder-press",
        "curls",
        "hammer-curl",
        "overhead-press",
        "lateral-raise",
        "dumbbell-rear-delt-fly",
      ],
    },
    {
      id: 10,
      name: "Back 1",
      sets: 4,
      time: {
        work: 40,
        rest: 20,
      },
      exercises: [
        "press-up-row",
        "left-hand-row",
        "right-hand-row",
        "deadlift",
        "dumbbell-stiff-legged-deadlift",
        "dumbbell-rear-delt-fly",
      ],
    },
    {
      id: 11,
      name: "Back 2",
      sets: 4,
      time: {
        work: 40,
        rest: 20,
      },
      exercises: [
        "press-up-row",
        "burpee-deadlift",
        "silverback-shrug",
        "left-hand-row",
        "right-hand-row",
        "deadlift",
      ],
    },
    {
      id: 12,
      name: "Abs 1",
      sets: 4,
      time: {
        work: 40,
        rest: 20,
      },
      exercises: [
        "dumbbell-situp",
        "wood-chopper",
        "cross-body-romanian-deadlift",
        "sumo-squat",
        "russian-twist",
        "dumbbell-crunch",
      ],
    },
    {
      id: 13,
      name: "#5",
      sets: 4,
      time: {
        work: 40,
        rest: 20,
      },
      exercises: [
        "wrist-curl",
        "diamond-pushups",
        "dumbbell-crunch",
        "calf-raises",
        "one-leg-dumbbell-squat",
        "dumbbell-lateral-raise",
      ],
    },
    {
      id: 1,
      name: "Debug",
      sets: 2,
      time: {
        work: 5,
        rest: 5,
      },
      exercises: ["overhead-press", "press-up-row"],
    },
  ];

  return routines;
}
