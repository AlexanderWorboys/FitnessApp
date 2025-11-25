import { getAllWorkouts, insertWorkout } from "../../database/workoutDb";
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
      await workoutApi.createWorkout(backendWorkout);
    } catch (err: any) {
            if (err.response) {
                console.error("Response error:", err.response.status, err.response.data);
            } else if (err.request) {
                console.error("No response received:", err.request);
            } else {
                console.error("Axios setup error:", err.message);
            }
            throw err;
        }

    return getAllWorkouts();
  },

  async getAllWorkouts() {
    const local = await getAllWorkouts();

    // Optionally pull from backend and merge
    try {
      const remote = await workoutApi.getWorkouts();
      console.log(remote)
      const mapped = remote.map(fromBackendWorkout);
      // merge logic: compare updatedAt timestamps
      return [...local, ...mapped];
    } catch {
      console.log("Only local fetched")
      return local;
    }
  },
};
