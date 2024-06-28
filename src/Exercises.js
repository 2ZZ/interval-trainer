// Video source: https://musclewiki.com/

export default function getExercises(format) {
  const exercises = [
    {
      displayName: "Squat",
      name: "squat",
      video: "male-barbell-pause-box-squat-front_GEhqEjs.mp4",
      defaults: { reps: 10, weight: 25 },
    },
    {
      displayName: "Shoulder Press",
      name: "shoulder-press",
      video: "male-dumbbell-overhead-press-front.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Lunge curl LH",
      name: "lunge-curl-lh",
      video: "lunge-curl-lh.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Lunge curl RH",
      name: "lunge-curl-rh",
      video: "lunge-curl-lh.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Situp",
      name: "dumbbell-situp",
      video: "male-Dumbbells-dumbbell-situp-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Floor Fly",
      name: "floor-fly",
      video: "male-dumbbell-chest-fly-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Goblet Squat",
      name: "goblet-squat",
      video: "male-dumbbell-goblet-squat-front.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Press-up Row",
      name: "press-up-row",
      video: "press-up-row.mp4",
      defaults: { reps: 10, weight: 20 },
    },
    {
      displayName: "Press Up",
      name: "press-up",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-push-up-side.mp4",
      defaults: { reps: 15, weight: 0 },
    },
    {
      displayName: "Overhead Press",
      name: "overhead-press",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-overhead-press-side_1DIUbfS.mp4",
      defaults: { reps: 10, weight: 20 },
    },
    {
      displayName: "Hammer Curl",
      name: "hammer-curl",
      video: "male-dumbbell-hammer-curl-front.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Floor to Ceiling Press",
      name: "floor-to-ceiling-press",
      video: "floor-to-ceiling-press.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Deadlift",
      name: "deadlift",
      video: "male-barbell-snatch-grip-deadlift-front.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Squat Press",
      name: "squat-press",
      video: "squat-press.mp4",
      defaults: { reps: 10, weight: 20 },
    },
    {
      displayName: "Split Squat",
      name: "split-squat",
      video: "male-dumbbell-split-squat-front.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Left Hand Row",
      name: "left-hand-row",
      video: "male-dumbbell-row-unilateral-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Right Hand Row",
      name: "right-hand-row",
      video: "male-dumbbell-row-unilateral-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Stiff Legged Deadlift",
      name: "dumbbell-stiff-legged-deadlift",
      video: "male-barbell-stiff-leg-deadlift-front.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Skullcrusher / Tricep Extension",
      name: "dumbbell-skullcrusher-tricep-extension",
      video: "male-dumbbell-skullcrusher-front_hgKANkM.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Lateral Raise",
      name: "lateral-raise",
      video: "male-dumbbell-lateral-raise-front.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Rear Delt Fly",
      name: "dumbbell-rear-delt-fly",
      video: "male-dumbbell-rear-delt-fly-front.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Curls",
      name: "curls",
      video: "curls.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Alternative Lunges",
      name: "alternative-lunges",
      video: "alternative-lunges.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Burpee Deadlift",
      name: "burpee-deadlift",
      video: "burpee-deadlift.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Calf Raise",
      name: "calf-raise",
      video: "male-Dumbbells-dumbbell-calf-raise-side.mp4",
      defaults: { reps: 15 },
    },
    {
      displayName: "Diamond Pushups",
      name: "diamond-pushups",
      video: "male-bodyweight-diamond-pushup-front.mp4",
      defaults: { reps: 15 },
    },
    {
      displayName: "Wrist Curl",
      name: "wrist-curl",
      video: "male-dumbbell-wrist-curl-side.mp4",
      defaults: { reps: 20 },
    },
    {
      displayName: "Silverback Shrug",
      name: "silverback-shrug",
      video: "male-Dumbbells-dumbbell-silverback-shrug-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Wood Chopper",
      name: "wood-chopper",
      video: "male-dumbbell-half-kneeling-wood-chopper-side.mp4",
      defaults: { reps: 15 },
    },
    {
      displayName: "Cross Body Romanian Deadlift",
      name: "cross-body-romanian-deadlift",
      video: "male-Dumbbells-dumbbell-cross-body-romanian-deadlift-front.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Sumo Squat",
      name: "sumo-squat",
      video: "male-dumbbell-sumo-squat-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Russian Twist",
      name: "russian-twist",
      video: "male-Dumbbells-dumbbell-russian-twist-side.mp4",
      defaults: { reps: 20 },
    },
    {
      displayName: "Dumbbell Crunch",
      name: "dumbbell-crunch",
      video: "male-dumbbell-crunch-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Goblet Squat",
      name: "dumbbell-goblet-squat",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-goblet-squat-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Row Bilateral",
      name: "dumbbell-row-bilateral",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-row-bilateral-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Forward Lunge",
      name: "dumbbell-forward-lunge",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-forward-lunge-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Overhead Press",
      name: "dumbbell-overhead-press",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-overhead-press-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Bench Press",
      name: "dumbbell-bench-press",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-bench-press-side_rqe1iTe.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Single Arm Row",
      name: "dumbbell-single-arm-row",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-single-arm-row-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Romanian Deadlift",
      name: "dumbbell-romanian-deadlift",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-romanian-deadlift-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Heels Up Goblet Squat",
      name: "dumbbell-heels-up-goblet-squat",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-heels-up-goblet-squat-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Chest Fly",
      name: "dumbbell-chest-fly",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-chest-fly-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Reverse Lunge",
      name: "dumbbell-reverse-lunge",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-reverse-lunge-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Neutral Overhead Press",
      name: "dumbbell-neutral-overhead-press",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-neutral-overhead-press-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Calf Raise",
      name: "dumbbell-calf-raise",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-calf-raise-side.mp4",
      defaults: { reps: 20 },
    },
    {
      displayName: "Dumbbell Wood Chopper",
      name: "dumbbell-wood-chopper",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-wood-chopper-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Bulgarian Split Squat",
      name: "dumbbell-bulgarian-split-squat",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-bulgarian-split-squat-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Laying Reverse Fly",
      name: "dumbbell-laying-reverse-fly",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-laying-reverse-fly-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Lateral Raise",
      name: "dumbbell-lateral-raise",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-lateral-raise-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Twisting Curl",
      name: "dumbbell-twisting-curl",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-twisting-curl-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Skullcrusher",
      name: "dumbbell-skullcrusher",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-skullcrusher-side_bgn7Uzz.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Bodyweight Reverse Lunge",
      name: "bodyweight-reverse-lunge",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-bodyweight-reverse-lunge-front.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Forearm Plank",
      name: "forearm-plank",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-forearm-plank-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Decline Push Up",
      name: "decline-push-up",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-decline-push-up-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Supermans",
      name: "supermans",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-supermans-front.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Glute Bridge",
      name: "glute-bridge",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-glute-bridge-front.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Forward Lunges",
      name: "forward-lunges",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-forward-lunges-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Push Up",
      name: "push-up",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-push-up-side.mp4",
      defaults: { reps: 15 },
    },
    {
      displayName: "Dumbbell Elbow Side Plank",
      name: "dumbbell-elbow-side-plank",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-weighted-side-plank-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Hand Plank",
      name: "hand-plank",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-hand-plank-front_ZnMlFBF.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Kickbacks",
      name: "kickbacks",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-kickbacks-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Calf Raises",
      name: "calf-raises",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-calf-raises-side.mp4",
      defaults: { reps: 20 },
    },
    {
      displayName: "Chin Ups",
      name: "chin-ups",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-chinup-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Lateral Lunge",
      name: "lateral-lunge",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-lateral-lunge-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Box Dips",
      name: "box-dips",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-dips-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Hollow Hold",
      name: "hollow-hold",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-hollow-hold-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Side Plank Reach Through",
      name: "side-plank-reach-through",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-side-plank-reach-through-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Nordic Hamstring Curl",
      name: "nordic-hamstring-curl",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-nordic-hamstring-curl-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Elevated Pike Press",
      name: "elevated-pike-press",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-elevated-pike-press-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Situp",
      name: "situp",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-situp-front.mp4",
      defaults: { reps: 20 },
    },
    {
      displayName: "Laying Leg Raises",
      name: "laying-leg-raises",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-leg-raises-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Elbow Side Plank",
      name: "elbow-side-plank",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-elbow-side-plank-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Dumbbell Side Bend",
      name: "dumbbell-side-bend",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-side-bend-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Crunches",
      name: "crunches",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-crunch-side.mp4",
      defaults: { reps: 20 },
    },
    {
      displayName: "Hanging Knee Raises",
      name: "hanging-knee-raises",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-hanging-knee-raises-side.mp4",
      defaults: { reps: 10 },
    },
    {
      displayName: "Bicycle Crunch",
      name: "bicycle-crunch",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-bicycle-crunch-front.mp4",
      defaults: { reps: 20 },
    },
    {
      displayName: "One Leg Dumbbell Squat",
      name: "one-leg-dumbbell-squat",
      image: "one-leg-dumbbell-squat.jpg",
      defaults: { reps: 10, weight: 20 },
    },
    {
      displayName: "One Leg Dumbbell Squat (Left)",
      name: "one-leg-dumbbell-squat-left",
      image: "one-leg-dumbbell-squat.jpg",
      defaults: { reps: 10, weight: 20 },
    },
    {
      displayName: "One Leg Dumbbell Squat (Right)",
      name: "one-leg-dumbbell-squat-right",
      image: "one-leg-dumbbell-squat.jpg",
      defaults: { reps: 10, weight: 20 },
    },
  ];
  return exercises.sort((a, b) => {
    if (a.displayName < b.displayName) {
      return -1;
    }
    if (a.displayName > b.displayName) {
      return 1;
    }
    return 0;
  });
}
