import { getAllWorkouts, insertWorkout, deleteWorkoutLocal, updateWorkoutId } from "../../database/workoutDb";
import { fromBackendWorkout, toBackendWorkout } from "../../mappers/workoutMapper";
import { Workout } from "../../types/workout";
import { workoutApi } from "./workoutApi";

// npx prisma generate
// first run npm run start:dev
//Remember to run npx prisma studio on backend project, make sure local host is 3000

export const workoutRepo = {
  async saveWorkout(workout: Workout) {
    // Save locally first
    await insertWorkout(workout);

    // Try syncing to backend
    try {
      const backendWorkout = toBackendWorkout(workout);
      //conversion error to fix
      const saved = await workoutApi.createWorkout(backendWorkout);

      // I update the workout ID to the database on so it syncs on update and delete
      await updateWorkoutId(workout.id, saved.id);
    } catch (err) {
            console.warn("Backend save failed, keeping local only");
        }

    return getAllWorkouts();
  },

  async getAllWorkouts() {
    const local = await getAllWorkouts();

    // Optionally pull from backend and merge
    try {
      const remote = await workoutApi.getWorkouts();
      const mapped = remote.map(fromBackendWorkout);
      // merge logic: compare updatedAt timestamps
      console.log("Workout Got")
      return [...local, ...mapped];
    } catch {
      console.warn("Only local fetched")
      return local;
    }
  },

  async deleteWorkout(id: string) {
    await deleteWorkoutLocal(id);

    try {
      await workoutApi.deleteWorkout(id);
    } catch(ex) {
      console.warn("backend delete failed, will try again later", ex)
    }

    return getAllWorkouts();
  }
};
