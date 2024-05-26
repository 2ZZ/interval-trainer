// Video source: https://musclewiki.com/

export default function getRoutines(format) {
  const routines = [
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
    {
      name: "Balanced 1",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Squat",
          video: "male-barbell-pause-box-squat-front_GEhqEjs.mp4",
        },
        {
          name: "Shoulder Press",
          video: "male-dumbbell-overhead-press-front.mp4",
        },
        { name: "Lunge curl LH", video: "lunge-curl-lh.mp4" },
        { name: "Lunge curl RH", video: "lunge-curl-lh.mp4" },
        {
          name: "Dumbbell Situp",
          video: "male-Dumbbells-dumbbell-situp-side.mp4",
        },
        { name: "Floor Fly", video: "male-dumbbell-chest-fly-side.mp4" },
      ],
    },
    {
      name: "Balanced 2",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        { name: "Goblet Squat", video: "male-dumbbell-goblet-squat-front.mp4" },
        {
          name: "Dumbbell Situp",
          video: "male-Dumbbells-dumbbell-situp-side.mp4",
        },
        { name: "Press-up Row", video: "press-up-row.mp4" },
        { name: "Hammer Curl", video: "male-dumbbell-hammer-curl-front.mp4" },
        { name: "Floor to Ceiling Press", video: "floor-to-ceiling-press.mp4" },
        {
          name: "Deadlift",
          video: "male-barbell-snatch-grip-deadlift-front.mp4",
        },
      ],
    },
    {
      name: "Balanced 3",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        { name: "Squat Press", video: "squat-press.mp4" },
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
        {
          name: "Dumbbell Stiff Legged Deadlift",
          video: "male-barbell-stiff-leg-deadlift-front.mp4",
        },
      ],
    },
    {
      name: "Balanced 4",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Dumbbell Skullcrusher / Tricep Extension",
          video: "male-dumbbell-skullcrusher-front_hgKANkM.mp4",
        },
        {
          name: "Lateral Raise",
          video: "male-dumbbell-lateral-raise-front.mp4",
        },
        {
          name: "Dumbbell Rear Delt Fly",
          video: "male-dumbbell-rear-delt-fly-front.mp4",
        },
        { name: "Curls", video: "curls.mp4" },
        { name: "Floor to Ceiling Press", video: "floor-to-ceiling-press.mp4" },
        { name: "Alternative Lunges", video: "alternative-lunges.mp4" },
      ],
    },
    {
      name: "Leg Routine 1",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Squat",
          video: "male-barbell-pause-box-squat-front_GEhqEjs.mp4",
        },
        { name: "Alternative Lunges", video: "alternative-lunges.mp4" },
        { name: "Goblet Squat", video: "male-dumbbell-goblet-squat-front.mp4" },
        {
          name: "Deadlift",
          video: "male-barbell-snatch-grip-deadlift-front.mp4",
        },
        { name: "Split Squat", video: "male-dumbbell-split-squat-front.mp4" },
        {
          name: "Dumbbell Stiff Legged Deadlift",
          video: "male-barbell-stiff-leg-deadlift-front.mp4",
        },
      ],
    },
    {
      name: "Leg Routine 2",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Squat",
          video: "male-barbell-pause-box-squat-front_GEhqEjs.mp4",
        },
        { name: "Burpee Deadlift", video: "burpee-deadlift.mp4" },
        {
          name: "Calf Raise",
          video: "male-Dumbbells-dumbbell-calf-raise-side.mp4",
        },
        { name: "Alternative Lunges", video: "alternative-lunges.mp4" },
        { name: "Goblet Squat", video: "male-dumbbell-goblet-squat-front.mp4" },
        { name: "Split Squat", video: "male-dumbbell-split-squat-front.mp4" },
      ],
    },
    {
      name: "Arm Routine 1",
      sets: 4,
      workTime: 30,
      restTime: 30,
      exercises: [
        {
          name: "Shoulder Press",
          video: "male-dumbbell-overhead-press-front.mp4",
        },
        { name: "Curls", video: "male-dumbbell-twisting-curl-front.mp4" },
        {
          name: "Diamond Pushups",
          video: "male-bodyweight-diamond-pushup-front.mp4",
        },
        { name: "Hammer Curl", video: "male-dumbbell-hammer-curl-front.mp4" },
        { name: "Wrist Curl", video: "male-dumbbell-wrist-curl-side.mp4" },
        {
          name: "Dumbbell Skullcrusher / Tricep Extension",
          video: "male-dumbbell-skullcrusher-side_bgn7Uzz.mp4",
        },
      ],
    },
    {
      name: "Arm Routine 2",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Shoulder Press",
          video: "male-dumbbell-overhead-press-front.mp4",
        },
        { name: "Curls", video: "curls.mp4" },
        { name: "Hammer Curl", video: "male-dumbbell-hammer-curl-front.mp4" },
        { name: "Floor to Ceiling Press", video: "floor-to-ceiling-press.mp4" },
        {
          name: "Lateral Raise",
          video: "male-dumbbell-lateral-raise-front.mp4",
        },
        {
          name: "Dumbbell Rear Delt Fly",
          video: "male-dumbbell-rear-delt-fly-front.mp4",
        },
      ],
    },
    {
      name: "Back Routine 1",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        { name: "Press-up Row", video: "press-up-row.mp4" },
        {
          name: "Left Hand Row",
          video: "male-dumbbell-row-unilateral-side.mp4",
        },
        {
          name: "Right Hand Row",
          video: "male-dumbbell-row-unilateral-side.mp4",
        },
        {
          name: "Deadlift",
          video: "male-barbell-snatch-grip-deadlift-front.mp4",
        },
        {
          name: "Dumbbell Stiff Legged Deadlift",
          video: "male-barbell-stiff-leg-deadlift-front.mp4",
        },
        {
          name: "Dumbbell Rear Delt Fly",
          video: "male-dumbbell-rear-delt-fly-front.mp4",
        },
      ],
    },
    {
      name: "Back Routine 2",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        { name: "Press-up Row", video: "press-up-row.mp4" },
        { name: "Burpee Deadlift", video: "burpee-deadlift.mp4" },
        {
          name: "Silverback Shrug",
          video: "male-Dumbbells-dumbbell-silverback-shrug-side.mp4",
        },
        {
          name: "Left Hand Row",
          video: "male-dumbbell-row-unilateral-side.mp4",
        },
        {
          name: "Right Hand Row",
          video: "male-dumbbell-row-unilateral-side.mp4",
        },
        {
          name: "Deadlift",
          video: "male-barbell-snatch-grip-deadlift-front.mp4",
        },
      ],
    },
    {
      name: "Abs Routine 1",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Dumbbell Situp",
          video: "male-Dumbbells-dumbbell-situp-side.mp4",
        },
        {
          name: "Wood Chopper",
          video: "male-dumbbell-half-kneeling-wood-chopper-side.mp4",
        },
        {
          name: "Cross Body Romanian Deadlift",
          video:
            "male-Dumbbells-dumbbell-cross-body-romanian-deadlift-front.mp4",
        },
        {
          name: "Sumo Squat",
          video: "male-dumbbell-sumo-squat-side.mp4",
        },
        {
          name: "Russian Twist",
          video: "male-Dumbbells-dumbbell-russian-twist-side.mp4",
        },
        {
          name: "Dumbbell Crunch",
          video: "male-dumbbell-crunch-side.mp4",
        },
      ],
    },
    {
      name: "Beginner Dumbbell Routine",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Dumbbell Goblet Squat",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-goblet-squat-side.mp4",
        },
        {
          name: "Dumbbell Row Bilateral",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-row-bilateral-side.mp4",
        },
        {
          name: "Dumbbell Forward Lunge",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-forward-lunge-side.mp4",
        },
        {
          name: "Dumbbell Overhead Press",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-overhead-press-side.mp4",
        },
      ],
    },
    {
      name: "Beginner's Dumbbell routine",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Dumbbell Bench Press",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-bench-press-side_rqe1iTe.mp4",
        },
        {
          name: "Dumbbell Single Arm Row",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-single-arm-row-side.mp4",
        },
        {
          name: "Dumbbell Romanian Deadlift",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-romanian-deadlift-side.mp4",
        },
        {
          name: "Dumbbell Heels Up Goblet Squat",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-heels-up-goblet-squat-side.mp4",
        },
      ],
    },
    {
      name: "Intermediate Dumbbell Routine",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Dumbbell Chest Fly",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-chest-fly-side.mp4",
        },
        {
          name: "Dumbbell Single Arm Row",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-single-arm-row-side.mp4",
        },
        {
          name: "Dumbbell Reverse Lunge",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-reverse-lunge-side.mp4",
        },
        {
          name: "Dumbbell Neutral Overhead Press",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-neutral-overhead-press-side.mp4",
        },
        {
          name: "Dumbbell Calf Raise",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-calf-raise-side.mp4",
        },
        {
          name: "Dumbbell Wood Chopper",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-wood-chopper-side.mp4",
        },
      ],
    },
    {
      name: "Advanced Dumbbell Routine",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Dumbbell Bulgarian Split Squat",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-bulgarian-split-squat-side.mp4",
        },
        {
          name: "Dumbbell Laying Reverse Fly",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-laying-reverse-fly-side.mp4",
        },
        {
          name: "Dumbbell Lateral Raise",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-lateral-raise-side.mp4",
        },
        {
          name: "Dumbbell Romanian Deadlift",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-romanian-deadlift-side.mp4",
        },
        {
          name: "Dumbbell Calf Raise",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-calf-raise-side.mp4",
        },
        {
          name: "Dumbbell Twisting Curl",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-twisting-curl-side.mp4",
        },
        {
          name: "Dumbbell Skullcrusher",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-skullcrusher-side_bgn7Uzz.mp4",
        },
      ],
    },
    {
      name: "Beginner Bodyweight Routine",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Bodyweight Reverse Lunge",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-bodyweight-reverse-lunge-front.mp4",
        },
        {
          name: "Forearm Plank",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-forearm-plank-side.mp4",
        },
        {
          name: "Decline Push Up",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-decline-push-up-side.mp4",
        },
        {
          name: "Supermans",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-supermans-front.mp4",
        },
        {
          name: "Glute Bridge",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-glute-bridge-front.mp4",
        },
      ],
    },
    {
      name: "Intermediate Bodyweight Routine",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Forward Lunges",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-forward-lunges-side.mp4",
        },
        {
          name: "Push Up",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-push-up-side.mp4",
        },
        {
          name: "Dumbbell Elbow Side Plank",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-weighted-side-plank-side.mp4",
        },
        {
          name: "Hand Plank",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-hand-plank-front_ZnMlFBF.mp4",
        },
        {
          name: "Kickbacks",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-kickbacks-side.mp4",
        },
        {
          name: "Calf Raises",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-calf-raises-side.mp4",
        },
      ],
    },
    {
      name: "Advanced Bodyweight Routine",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Chin Ups",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-chinup-side.mp4",
        },
        {
          name: "Calf Raises",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-calf-raises-side.mp4",
        },
        {
          name: "Lateral Lunge",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-lateral-lunge-side.mp4",
        },
        {
          name: "Box Dips",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-dips-side.mp4",
        },
        {
          name: "Hollow Hold",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-hollow-hold-side.mp4",
        },
        {
          name: "Side Plank Reach Through",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-side-plank-reach-through-side.mp4",
        },
        {
          name: "Nordic Hamstring Curl",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-nordic-hamstring-curl-side.mp4",
        },
        {
          name: "Elevated Pike Press",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-elevated-pike-press-side.mp4",
        },
      ],
    },
    {
      name: "Core Conditioning",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Situp",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-situp-front.mp4",
        },
        {
          name: "Laying Leg Raises",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-leg-raises-side.mp4",
        },
        {
          name: "Elbow Side Plank",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-elbow-side-plank-side.mp4",
        },
        {
          name: "Dumbbell Side Bend",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-side-bend-side.mp4",
        },
      ],
    },
    {
      name: "Ab Routine 1",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Crunches",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-crunch-side.mp4",
        },
        {
          name: "Hanging Knee Raises",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-hanging-knee-raises-side.mp4",
        },
        {
          name: "Bicycle Crunch",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-bicycle-crunch-front.mp4",
        },
      ],
    },
    {
      name: "Ab Routine 3",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Laying Leg Raises",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-leg-raises-side.mp4",
        },
        {
          name: "Dumbbell Russian Twist",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-russian-twist-front.mp4",
        },
      ],
    },
    {
      name: "The 1 Dumbbell Routine",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Dumbbell Goblet Reverse Lunge",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-goblet-reverse-lunge-side.mp4",
        },
        {
          name: "Dumbbell Single Arm Row",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-single-arm-row-side.mp4",
        },
        {
          name: "Dumbbell Goblet Good Morning",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-goblet-good-morning-side.mp4",
        },
        {
          name: "Push Up",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-push-up-side.mp4",
        },
      ],
    },
    {
      name: "Full Body Bodybuilding - Day 1",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Barbell Squat",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Barbell-barbell-squat-front.mp4",
        },
        {
          name: "Dumbbell Curl",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-curl-side.mp4",
        },
        {
          name: "Dumbbell Lateral Raise",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-lateral-raise-side.mp4",
        },
        {
          name: "Dumbbell Overhead Tricep Extension",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-overhead-tricep-extension-side_GLrtump.mp4",
        },
        {
          name: "Machine Hamstring Curl",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-machine-hamstring-curl-side.mp4",
        },
      ],
    },
    {
      name: "Full Body Bodybuilding - Day 2",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Dumbbell Bulgarian Split Squat",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-bulgarian-split-squat-side.mp4",
        },
        {
          name: "Barbell Bench Press",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bench-press-side_KciuhbB.mp4",
        },
        {
          name: "Cable High Single Arm Rear Delt Fly",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Cables-cable-rear-delt-fly-side.mp4",
        },
        {
          name: "Machine Pulldown",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-machine-pulldown-side.mp4",
        },
        {
          name: "Machine Standing Calf Raises",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-machine-standing-calf-raises-side.mp4",
        },
      ],
    },
    {
      name: "Full Body Bodybuilding - Day 3",
      sets: 4,
      workTime: 40,
      restTime: 20,
      exercises: [
        {
          name: "Barbell Romanian Deadlift",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Barbell-barbell-romanian-deadlift-front.mp4",
        },
        {
          name: "Cable Chest Press",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-cable-chestpress-side.mp4",
        },
        {
          name: "Cable High Single Arm Rear Delt Fly",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Cables-cable-rear-delt-fly-side.mp4",
        },
        {
          name: "Cable Lat Prayer",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-Cables-cable-lat-prayer-side.mp4",
        },
        {
          name: "Plate Full Lateral Raise",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-plate-full-lateral-raise-side.mp4",
        },
        {
          name: "Machine Leg Extension",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-machine-leg-extension-side.mp4",
        },
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
