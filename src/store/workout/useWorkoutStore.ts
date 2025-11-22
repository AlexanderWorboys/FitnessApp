import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { WorkoutSlice, createWorkoutSlice } from "./workoutSlice";
import { ExerciseSlice, createExerciseSlice } from "./exerciseSlice";
import { TemplateSlice, createTemplateSlice } from "./templateSlice";

export type StoreState = WorkoutSlice & ExerciseSlice & TemplateSlice;

export const useWorkoutStore = create<StoreState>()(
  persist(
    (...args) => ({
      ...createWorkoutSlice(...args),
      ...createExerciseSlice(...args),
      ...createTemplateSlice(...args),
    }),
    {
      name: "workout-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
