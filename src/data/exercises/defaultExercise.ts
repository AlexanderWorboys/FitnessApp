import { ExerciseType } from "../../types/workout";

export type EquipmentType = 
    | "barbell"
    | "dumbbell"
    | "machine"
    | "cable"
    | "bodyweight"
    | "kettlebell";

    export type MuscleGroup = 
    | "chest"
    | "back"
    | "legs"
    | "shoulders"
    | "core"
    | "full-body";
    

export interface BaseExercise {
    id: string;
    name: string;
    type: ExerciseType;
    muscleGroup: MuscleGroup;
    equipment: EquipmentType;
}

export const defaultExercises: BaseExercise[] = [
  {
    id: "squat-barbell",
    name: "Barbell Squat",
    type: "weight",
    muscleGroup: "legs",
    equipment: "barbell",
  },
  {
    id: "bench-barbell",
    name: "Barbell Bench Press",
    type: "weight",
    muscleGroup: "chest",
    equipment: "barbell",
  },
  {
    id: "deadlift",
    name: "Deadlift",
    type: "weight",
    muscleGroup: "back",
    equipment: "barbell",
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    type: "weight",
    muscleGroup: "back",
    equipment: "machine",
  },
  {
    id: "plank",
    name: "Plank",
    type: "timed",
    muscleGroup: "core",
    equipment: "bodyweight",
  },
];