import { create } from "zustand";
import { defaultExercises, BaseExercise } from "../data/exercises/defaultExercise";

// This will hold base exercises, later will hold custom exercises and downloaded ones from social pages

interface ExerciseLibraryState {
  allExercises: BaseExercise[];

  searchExercises: (query: string) => BaseExercise[];
}

export const useExerciseLibrary = create<ExerciseLibraryState>((set, get) => ({
  allExercises: defaultExercises,

  searchExercises: (query) => {
    const { allExercises } = get();
    const lower = query.toLowerCase();
    return allExercises.filter((e) => e.name.toLowerCase().includes(lower));
  },
}));
