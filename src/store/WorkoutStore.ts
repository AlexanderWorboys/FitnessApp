import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Workout, WorkoutExercise } from "../types/workout";
import * as SQLite from "expo-sqlite"



interface WorkoutStore {
  activeWorkout: Workout | null
  startWorkout: (name: string) => void
  addExercise: (exercise: WorkoutExercise) => void
  updateExercise: (id: string, updatedExercise: WorkoutExercise) => void
}


export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  activeWorkout: null,

  startWorkout: (name) => {
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name,
      startTime: Date.now(),
      exercises: []
    }
    set({ activeWorkout: newWorkout })
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
}))
// export const useWorkoutStore = create(
//     persist(
//         (set, get) => ({
//             workouts: [] as Workout[],
//             activeWorkoutId: null as string | null,

//             startWorkout: (name: string, templateId?: string) => {
//                 const newWorkout: Workout = {
//                     id: Date.now().toString(),
//                     name,
//                     startTime: new Date().toISOString(),
//                     exercises: [],
//                     status: "active",
//                     templateId,
//                 };
//                 set({activeWorkout: newWorkout });
//             },

//             addExercise: (exercise: WorkoutExercise) => {
//                 const workout = get().activeWorkout
//                 if (!workout) return;
//                 workout.exercises.push(exercise);
//                 set({ activeWorkout: {...workout} });
//             },

//             updateExercise: (exerciseId: string, updated: WorkoutExercise) => {
//                 const workout = get().activeWorkout
//                 if (!workout) return
//                 const index = workout.exercises.findIndex(e => e.id === exerciseId)
//                 if (index === -1) return
//                 workout.exercises[index] = updated
//                 set({ activeWorkout: { ...workout } })
//             },

//             completeWorkout: () => {
//                 const workout = get().activeWorkout
//                 if (!workout) return;
//                 workout.status = "completed";
//                 workout.endTime = new Date().toISOString();
//                 set((state: { workouts: any; }) => ({
//                     workouts: [...state.workouts, workout],
//                     activeWorkoutId: null,
//                 }));
//             }

//         }),
//         {
//             name: "workout-storage",
//         }
//     )
// )