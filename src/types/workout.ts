export type ExerciseType = "weight" | "timed" | "distance";

export interface setEntry {
    id: string;
    setNumber: number;
    kg?: number;
    reps?: number;
    time?: string;
    km?: number;
    distance?: number;
    complete: boolean;
}

export interface WorkoutExercise {
    id: string;
    name: string;
    type: ExerciseType;
    sets: setEntry[];
    previousSets?: setEntry[];
    columns?: any[]; // this links to the column definitions
}

export interface Workout {
  id: string
  name: string
  startTime: number
  exercises: WorkoutExercise[]
}

