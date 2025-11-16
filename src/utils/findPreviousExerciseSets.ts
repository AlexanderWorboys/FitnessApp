import { ExerciseType, setEntry, Workout } from "../types/workout";

export const findPreviousExerciseSets = (
    exerciseName: string,
    workouts: Workout[]
): setEntry[] | null => {
    for(let i = workouts.length -1; i >= 0; i--) {
        const workout = workouts[i];

        const match = workout.exercises.find(
            (ex) => ex.name.toLowerCase() === exerciseName.toLowerCase()
        );

        if(match && match.sets.length > 0) {
            return match.sets;
        }
    }

    return null;
}

export const formatPreviousSet = (
  prev: setEntry,
  type: ExerciseType
) => {
  switch (type) {
    case "weight":
      return `${prev.kg ?? 0}kg × ${prev.reps ?? 0}`;
    case "timed":
      return `${prev.time ?? "0:00"}`;
    case "distance":
      return `${prev.km ?? prev.distance ?? 0}km`;
    default:
      return "-";
  }
};
