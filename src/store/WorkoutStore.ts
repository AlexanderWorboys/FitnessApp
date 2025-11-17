import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Workout, WorkoutExercise, WorkoutTemplate } from "../types/workout";
import * as SQLite from "expo-sqlite"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getAllWorkouts, insertWorkout } from "../database/workoutDb";
import { createEmptySet, getColumnsForType } from "../data/tableColumns";
import { findPreviousExerciseSets } from "../utils/findPreviousExerciseSets";



interface WorkoutStore {
  activeWorkout: Workout | null
  workoutHistory: Workout[]
  templates: WorkoutTemplate[]

  // Create
  setTemplates: (templates: WorkoutTemplate[]) => void
  startWorkout: (name: string, templateId?: string) => void
  addExercise: (exercise: WorkoutExercise) => void
  addTemplate: (template: WorkoutTemplate) => void

  // Reads
  loadWorkoutHistory: () => void;
  loadTemplate: (tempalteId: string) => void

  // Updates
  updateWorkoutName: (id: string, name: string) => void
  updateExercise: (id: string, updatedExercise: WorkoutExercise) => void
  completeWorkout: () => void
}


export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      activeWorkout: null,
      workoutHistory: [],
      templates: [],

      setTemplates: (templates) => set({ templates }),

      startWorkout: (name, templateId) => {
        const template = templateId
          ? get().templates.find((t) => t.id === templateId)
          : null

        const newWorkout: Workout = {
          id: Date.now().toString(),
          name,
          startTime: Date.now(),
          exercises: template ? [...template.exercises] : [],
          completed: false,
          fromTemplate: templateId,
        }

        set({ activeWorkout: newWorkout })
      },

      loadWorkoutHistory: async () => {
        const workouts = await getAllWorkouts();
        set({ workoutHistory: workouts });
      },

      completeWorkout: async () => {
        const { activeWorkout } = get()
        if (!activeWorkout) return

        const completeWorkout = {
          ...activeWorkout,
          completed: true,
          endTime: Date.now(),
        }

        insertWorkout(completeWorkout);

        const workouts = await getAllWorkouts();
        set({ activeWorkout: null, workoutHistory: workouts })
      },

      // addExercise: (exercise) => {
      //   const { activeWorkout } = get()
      //   if (!activeWorkout) return
      //   set({
      //     activeWorkout: {
      //       ...activeWorkout,
      //       exercises: [...activeWorkout.exercises, exercise],
      //     },
      //   })
      // },
      addExercise: (exercise) =>
        set((state) => {
          if (!state.activeWorkout) return state;

          // This will need updating to workout id in the future
          const previous = findPreviousExerciseSets(exercise.name, state.workoutHistory);
          console.log(previous);

          const newExercise: WorkoutExercise = {
            id: Date.now().toString(),
            name: exercise.name,
            type: exercise.type,
            columns: getColumnsForType(exercise.type),
            sets: [createEmptySet(exercise.type, 1)],
            previous: previous ?? [],
          };

          return {
            activeWorkout: {
              ...state.activeWorkout,
              exercises: [...state.activeWorkout.exercises, newExercise],
            },
          };
        }),

      updateExercise: (id, updatedExercise) => {
        const { activeWorkout } = get()
        if (!activeWorkout) return
        set({
          activeWorkout: {
            ...activeWorkout,
            exercises: activeWorkout.exercises.map((ex) =>
              ex.id === id ? updatedExercise : ex
            ),
          },
        })
      },

      updateWorkoutName: (id, name) => {
        const { activeWorkout } = get()
        if (!activeWorkout || activeWorkout.id !== id) return

        set({
          activeWorkout: {
            ...activeWorkout,
            name, // overwrite just the name
          },
        })
      },

      loadTemplate: (templateId) => {
        const template = get().templates.find((t) => t.id === templateId)
        if (!template) return
        set({
          activeWorkout: {
            id: Date.now().toString(),
            name: template.name,
            startTime: Date.now(),
            exercises: template.exercises.map((ex) => ({
              ...ex,
              sets: ex.sets.map((s) => ({ ...s, complete: false })),
            })),
            completed: false,
            fromTemplate: templateId,
          },
        })
      },

      addTemplate: (template) => {
        set((state) => ({
          templates: [...state.templates, { ...template, createdAt: Date.now() }],
        }))
      },
    }),
    {
      name: "workout-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)