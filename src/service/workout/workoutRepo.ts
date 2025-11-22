import { getAllWorkouts, insertWorkout } from "../../database/workoutDb";
import { Workout } from "../../types/workout";



export const workoutRepo = {
  async saveWorkout(workout: Workout) {
    await insertWorkout(workout);
    return getAllWorkouts();
  },
  async getAllWorkouts() {
    return getAllWorkouts();
  },
};
