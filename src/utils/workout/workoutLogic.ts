import { createEmptySet, getColumnsForType } from "../../data/tableColumns";
import { WorkoutExercise } from "../../types/workout";
import { findPreviousExerciseSets } from "../findPreviousExerciseSets";


export function buildNewExercise(exercise: WorkoutExercise, history: any[]): WorkoutExercise {
  const previous = findPreviousExerciseSets(exercise.name, history);
  return {
    id: Date.now().toString(),
    name: exercise.name,
    type: exercise.type,
    columns: getColumnsForType(exercise.type),
    sets: [createEmptySet(exercise.type, 1)],
    previous: previous ?? [],
  };
}
