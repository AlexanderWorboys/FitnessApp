import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Workout, WorkoutExercise, WorkoutTemplate } from "../types/workout";
import * as SQLite from "expo-sqlite"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { insertWorkout } from "../database/workoutDb";



interface WorkoutStore {
  activeWorkout: Workout | null
  templates: WorkoutTemplate[]
  setTemplates: (templates: WorkoutTemplate[]) => void

  startWorkout: (name: string, templateId?: string) => void
  completeWorkout: () => void
  addExercise: (exercise: WorkoutExercise) => void
  updateExercise: (id: string, updatedExercise: WorkoutExercise) => void
  loadTemplate: (tempalteId: string) => void
  addTemplate: (template: WorkoutTemplate) => void
}


export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      activeWorkout: null,
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

      completeWorkout: () => {
        const { activeWorkout } = get()
        if(!activeWorkout) return
        const completeWorkout = {
          ...activeWorkout,
            completed: true,
            endTime: Date.now(),
        }
        insertWorkout(completeWorkout)
        set({ activeWorkout })
      },

      addExercise: (exercise) => {
        const { activeWorkout } = get()
        if (!activeWorkout) return
        set({
          activeWorkout: {
            ...activeWorkout,
            exercises: [...activeWorkout.exercises, exercise],
          },
        })
      },

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
// export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
//   activeWorkout: null,

//   startWorkout: (name) => {
//     const newWorkout: Workout = {
//       id: Date.now().toString(),
//       name,
//       startTime: Date.now(),
//       exercises: []
//     }
//     set({ activeWorkout: newWorkout })
//   },

//   addExercise: (exercise) => {
//     const { activeWorkout } = get()
//     if (!activeWorkout) return
//     set({
//       activeWorkout: {
//         ...activeWorkout,
//         exercises: [...activeWorkout.exercises, exercise],
//       },
//     })
//   },

//   updateExercise: (id, updatedExercise) => {
//     const { activeWorkout } = get()
//     if (!activeWorkout) return
//     set({
//       activeWorkout: {
//         ...activeWorkout,
//         exercises: activeWorkout.exercises.map((ex) =>
//           ex.id === id ? updatedExercise : ex
//         ),
//       },
//     })
//   },
// }))