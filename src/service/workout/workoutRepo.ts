import { getAllWorkouts, insertWorkout, deleteWorkoutLocal, updateWorkoutId } from "../../database/workoutDb";
import { fromBackendWorkout, toBackendWorkout } from "./workoutMapper";
import { useSyncStore } from "../../store/sync/syncSlice";
import { Workout } from "../../types/workout";
import { workoutApi } from "./workoutApi";

const generateSyncId = () => `${Date.now()}_${Math.random().toString(36).slice(2)}`;

export const workoutRepo = {
  async saveWorkout(workout: Workout) {
    const sync = useSyncStore.getState();

    await insertWorkout(workout);

    const backendWorkout = toBackendWorkout(workout);
    workoutApi.createWorkout(backendWorkout)
      .then(async (saved) => {
        // I update the workout ID to the database on so it syncs on update and delete
        console.log("successful ID Swap")
        await updateWorkoutId(workout.id, saved.id);
      })
      .catch((err) => {
        console.warn("Backend save failed, added to sync queue", err);
        const genid = generateSyncId()
        console.log("Failed tempId: ", genid)

        sync.addToQueue({
          id: genid,
          type: "CREATE",
          entity: "WORKOUT",
          payload: workout,
          timestamp: Date.now()
        });
      });

    return getAllWorkouts();
  },

  async getAllWorkouts() {
    const local = await getAllWorkouts();

    try {
      const remote = await workoutApi.getWorkouts();
      const mapped = remote.map(fromBackendWorkout);

      const byId = new Map<string, Workout>();

      for (const w of local) byId.set(w.id, w);
      for (const w of mapped) {
        const existing = byId.get(w.id);

        if (!existing) {
          byId.set(w.id, w);
        } else {
          if ((w.updatedAt ?? 0) > (existing.updatedAt ?? 0)) {
            byId.set(w.id, w);
          }
        }
      }

      return Array.from(byId.values());

      // merge logic: compare updatedAt timestamps
      //return [...local, ...mapped];
    } catch {
      console.warn("Only local fetched")
      return local;
    }
  },

  async deleteWorkout(id: string) {
    const sync = useSyncStore.getState();

    // 1. local
    await deleteWorkoutLocal(id);

    try {
      // 2. try backend
      await workoutApi.deleteWorkout(id);
    } catch (ex) {
      console.warn("backend delete failed, will try again later", ex)

      // 3. try failed, add to sync
      sync.addToQueue({
        id: generateSyncId(),
        type: "DELETE",
        entity: "WORKOUT",
        payload: id,
        timestamp: Date.now()
      })
    }

    return getAllWorkouts();
  }
};
