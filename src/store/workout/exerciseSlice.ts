import { StateCreator } from "zustand";
import { WorkoutExercise } from "../../types/workout";
import { buildNewExercise } from "../../utils/workout/workoutLogic";
import { StoreState } from "./useWorkoutStore";


export interface ExerciseSlice {
  addExercise: (exercise: WorkoutExercise) => void;
  updateExercise: (id: string, updatedExercise: WorkoutExercise) => void;
  deleteExercise: (id: string) => void;
}

export const createExerciseSlice: StateCreator<StoreState, [], [], ExerciseSlice> = (set, get) => ({
  addExercise: (exercise) =>
    set((state) => {
      if (!state.activeWorkout) return state;
      const newExercise = buildNewExercise(exercise, state.workoutHistory);
      return {
        activeWorkout: {
          ...state.activeWorkout,
          exercises: [...state.activeWorkout.exercises, newExercise],
        },
      };
    }),

  updateExercise: (id, updatedExercise) => {
    const { activeWorkout } = get();
    if (!activeWorkout) return;
    set({
      activeWorkout: {
        ...activeWorkout,
        exercises: activeWorkout.exercises.map((ex) =>
          ex.id === id ? updatedExercise : ex
        ),
      },
    });
  },

  deleteExercise: (id) => {
    const { activeWorkout } = get();
    if (!activeWorkout) return;
    set({
      activeWorkout: {
        ...activeWorkout,
        exercises: activeWorkout.exercises.filter((ex) => ex.id !== id),
      },
    });
  },
});
