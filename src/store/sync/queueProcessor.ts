import { workoutApi } from "../../service/workout/workoutApi";
import { SyncAction } from "./types";

// Handles what type of sync action will be passed into the backlog
export async function processSyncAction(action: SyncAction) {
  const { type, entity, payload } = action;

  switch (entity) {
    case "WORKOUT":
      return handleWorkoutSync(type, payload);

    // case "MEALS": // For later implimentations
    //   return handleMealsSync(type, payload);

    default:
      throw new Error("Unknown sync entity: " + entity);
  }
}

async function handleWorkoutSync(type: string, payload: any) {
  switch (type) {
    case "DELETE":
      return workoutApi.deleteWorkout(payload.id);

    case "CREATE":
      return workoutApi.createWorkout(payload);

    // case "UPDATE":
    //   return workoutApi.updateWorkout(payload.id, payload);

    default:
      throw new Error("Unknown sync type: " + type);
  }
}