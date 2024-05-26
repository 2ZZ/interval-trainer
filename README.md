## Workout Assistant

#### Run locally

```
npm run start
npm run test
npm run build
```

#### Reset Jest snapshots

```
npm test -- -u # Remove & update Jest snapshots
```

#### TODO

- Skip last cooldown
- Sound
- More tests
- More workouts
- Add a delay to unpause

#### Copy routine example

```
curl -s "https://musclewiki.com/newapi/workout/originals/workouts/?slug=full-body-bodybuilding-1" | jq -r '{
  name: .results[0].name,
  sets: 4,
  workTime: 40,
  restTime: 20,
  exercises: [
    .results[0].exercises[] | {
      name: .exercise.name,
      video: .exercise.male_images[-1].branded_video
    }
  ]
}'
```
