import { StateCreator } from "zustand";

import { Workout } from "../../types/workout";
import { workoutRepo } from "../../service/workout/workoutRepo";

export interface WorkoutSlice {
  activeWorkout: Workout | null;
  workoutHistory: Workout[];

  startWorkout: (name: string, templateId?: string) => void;
  completeWorkout: () => Promise<void>;
  cancelWorkout: () => void;
  loadWorkoutHistory: () => Promise<void>;
  updateWorkoutName: (id: string, name: string) => void;
}

export const createWorkoutSlice: StateCreator<WorkoutSlice> = (set, get) => ({
  activeWorkout: null,
  workoutHistory: [],

  startWorkout: (name, templateId) => {
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name,
      startTime: Date.now(),
      exercises: [],
      completed: false,
      fromTemplate: templateId,
    };
    set({ activeWorkout: newWorkout });
  },

  completeWorkout: async () => {
    const { activeWorkout } = get();
    if (!activeWorkout) return;

    const completeWorkout = {
      ...activeWorkout,
      completed: true,
      endTime: Date.now(),
    };

    const workouts = await workoutRepo.saveWorkout(completeWorkout);
    set({ activeWorkout: null, workoutHistory: workouts });
  },

  cancelWorkout: () => set({ activeWorkout: null }),

  loadWorkoutHistory: async () => {
    const workouts = await workoutRepo.getAllWorkouts();
    set({ workoutHistory: workouts });
  },

  updateWorkoutName: (id, name) => {
    const { activeWorkout } = get();
    if (!activeWorkout || activeWorkout.id !== id) return;
    set({ activeWorkout: { ...activeWorkout, name } });
  },
});
