// Video source: https://musclewiki.com/

export default function getRoutines(format) {
  const routines = [
    {
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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
      id: 9,
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
      id: 10,
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
      id: 11,
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
      id: 12,
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
      id: 13,
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
      id: 14,
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
      id: 15,
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
      id: 16,
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
      id: 17,
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
      id: 18,
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
      id: 19,
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
      id: 20,
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
      id: 1,
      name: "Debug",
      sets: 2,
      workTime: 5,
      restTime: 5,
      exercises: ["squat-press", "press-up-row"],
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
