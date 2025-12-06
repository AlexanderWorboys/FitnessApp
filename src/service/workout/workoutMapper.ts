import { Workout } from "../../types/workout";

export const toBackendWorkout = (workout: Workout) => ({
  id: workout.id,
  name: workout.name,
  startTime: new Date(workout.startTime).toISOString(),
  endTime: workout.endTime ? new Date(workout.endTime).toISOString() : null,
  status: workout.completed ? "completed" : "in_progress",
  exercises: workout.exercises.map(ex => ({
    id: ex.id,
    name: ex.name,
    type: ex.type,
    sets: ex.sets,
    //previous: ex.previous,
  })),
});

export const fromBackendWorkout = (remote: any): Workout => ({
  id: remote.id,
  name: remote.name,
  startTime: new Date(remote.startTime).getTime(),
  endTime: remote.endTime ? new Date(remote.endTime).getTime() : undefined,
  exercises: remote.exercises || [],
  completed: remote.status === "completed",
  fromTemplate: remote.fromTemplate,
});