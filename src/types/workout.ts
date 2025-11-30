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
    previous?: setEntry[];
    columns?: any[]; // this links to the column definitions
}

export interface Workout {
  id: string
  name: string
  startTime: number
  endTime?: number
  exercises: WorkoutExercise[]
  completed: boolean
  fromTemplate?: string;
  updatedAt?: any;
}

export interface WorkoutTemplate {
  id: string
  name: string
  description?: string
  exercises: WorkoutExercise[]
  createdAt: number
  updatedAt?: number
  tags?: string[]
}


