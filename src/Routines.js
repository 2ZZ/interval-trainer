// Video source: https://musclewiki.com/

export default function getRoutines(format) {
  const routines = [
    {
      name: "Debug",
      sets: 2,
      workTime: 5,
      restTime: 5,
      exercises: ["squat-press", "press-up-row"],
    },
    {
      name: "Balanced 1",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        "squat",
        "shoulder-press",
        "floor-fly",
        "dumbbell-situp",
        "forward-lunges",
        "sumo-squat",
      ],
    },
    {
      name: "Balanced 2",
      sets: 4,
      workTime: 40,
      restTime: 20,
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
      name: "Balanced 3",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        "squat-press",
        "hammer-curl",
        "split-squat",
        "left-hand-row",
        "right-hand-row",
        "dumbbell-stiff-legged-deadlift",
      ],
    },
    {
      name: "Balanced 4",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        "dumbbell-skullcrusher-tricep-extension",
        "lateral-raise",
        "dumbbell-rear-delt-fly",
        "curls",
        "floor-to-ceiling-press",
        "alternative-lunges",
      ],
    },
    {
      name: "Legs 1",
      sets: 4,
      workTime: 40,
      restTime: 20,
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
      name: "Legs 2",
      sets: 4,
      workTime: 40,
      restTime: 20,
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
      name: "Arms 1",
      sets: 4,
      workTime: 30,
      restTime: 30,
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
      name: "Arms 2",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        "shoulder-press",
        "curls",
        "hammer-curl",
        "floor-to-ceiling-press",
        "lateral-raise",
        "dumbbell-rear-delt-fly",
      ],
    },
    {
      name: "Back 1",
      sets: 4,
      workTime: 40,
      restTime: 20,
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
      name: "Back 2",
      sets: 4,
      workTime: 40,
      restTime: 20,
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
      name: "Abs 1",
      sets: 4,
      workTime: 40,
      restTime: 20,
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
      name: "Beginner Dumbbell",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        "dumbbell-goblet-squat",
        "dumbbell-row-bilateral",
        "dumbbell-forward-lunge",
        "dumbbell-overhead-press",
      ],
    },
    {
      name: "Beginner's Dumbbell routine",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        "dumbbell-bench-press",
        "dumbbell-single-arm-row",
        "dumbbell-romanian-deadlift",
        "dumbbell-heels-up-goblet-squat",
      ],
    },
    {
      name: "Intermediate Dumbbell",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        "dumbbell-chest-fly",
        "dumbbell-single-arm-row",
        "dumbbell-reverse-lunge",
        "dumbbell-neutral-overhead-press",
        "dumbbell-calf-raise",
        "dumbbell-wood-chopper",
      ],
    },
    {
      name: "Advanced Dumbbell",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        "dumbbell-bulgarian-split-squat",
        "dumbbell-laying-reverse-fly",
        "dumbbell-lateral-raise",
        "dumbbell-romanian-deadlift",
        "dumbbell-calf-raise",
        "dumbbell-twisting-curl",
        "dumbbell-skullcrusher",
      ],
    },
    {
      name: "Beginner Bodyweight",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        "bodyweight-reverse-lunge",
        "forearm-plank",
        "decline-push-up",
        "supermans",
        "glute-bridge",
      ],
    },
    {
      name: "Intermediate Bodyweight",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        "forward-lunges",
        "push-up",
        "dumbbell-elbow-side-plank",
        "hand-plank",
        "kickbacks",
        "calf-raises",
      ],
    },
    {
      name: "Advanced Bodyweight",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        "chin-ups",
        "calf-raises",
        "lateral-lunge",
        "box-dips",
        "hollow-hold",
        "side-plank-reach-through",
        "nordic-hamstring-curl",
        "elevated-pike-press",
      ],
    },
    {
      name: "Core Conditioning",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        "situp",
        "laying-leg-raises",
        "elbow-side-plank",
        "dumbbell-side-bend",
      ],
    },
    {
      name: "Ab 1",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: ["crunches", "hanging-knee-raises", "bicycle-crunch"],
    },
    {
      name: "Ab 3",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: ["laying-leg-raises", "dumbbell-russian-twist"],
    },
    {
      name: "1 Dumbbell",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        "dumbbell-goblet-reverse-lunge",
        "dumbbell-single-arm-row",
        "dumbbell-goblet-good-morning",
        "push-up",
      ],
    },
    {
      name: "Full Body - Day 1",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        "barbell-squat",
        "dumbbell-curl",
        "dumbbell-lateral-raise",
        "dumbbell-overhead-tricep-extension",
        "machine-hamstring-curl",
      ],
    },
    {
      name: "Full Body - Day 2",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        "dumbbell-bulgarian-split-squat",
        "barbell-bench-press",
        "cable-high-single-arm-rear-delt-fly",
        "machine-pulldown",
        "machine-standing-calf-raises",
      ],
    },
    {
      name: "Full Body - Day 3",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        "barbell-romanian-deadlift",
        "cable-chest-press",
        "cable-high-single-arm-rear-delt-fly",
        "cable-lat-prayer",
        "plate-full-lateral-raise",
        "machine-leg-extension",
      ],
    },
  ];

  return routines.map((workout) => {
    const { sets, exercises } = workout;
    let formattedExercises;

    if (format === "circuit") {
      formattedExercises = Array(sets)
        .fill(null)
        .flatMap(() => exercises);
    } else if (format === "series") {
      formattedExercises = exercises.flatMap((exercise) =>
        Array(sets).fill(exercise)
      );
    } else {
      formattedExercises = exercises;
    }

    return {
      ...workout,
      exercises: formattedExercises,
    };
  });
}
