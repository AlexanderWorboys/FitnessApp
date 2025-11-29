import * as SQLite from "expo-sqlite"
import { WorkoutExercise } from "../types/workout"


let db: SQLite.SQLiteDatabase | null = null
//const db = SQLite.openDatabaseAsync("workout.db")

export const initWorkoutDb = async () => {
    db = await SQLite.openDatabaseAsync("workouts.db")

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS workouts (
            id TEXT PRIMARY KEY NOT NULL,
            name TEXT,
            startTime INTEGER,
            endTime INTEGER,
            completed INTEGER,
            fromTemplate TEXT,
            exercises TEXT
        );
    `)

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS templates (
            id TEXT PRIMARY KEY NOT NULL,
            name TEXT,
            description TEXT,
            tags TEXT,
            exercises TEXT,
            createdAt INTEGER,
            updatedAt INTEGER
        );
    `)

    console.log("📦 Workout DB initialized")
}

export const insertWorkout = async (workout: any) => {
    if (!db) return

    await db.runAsync(
        `INSERT INTO workouts (id, name, startTime, endTime, completed, fromTemplate, exercises)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
        workout.id,
        workout.name,
        workout.startTime,
        workout.endTime ?? null,
        workout.completed ? 1 : 0,
        workout.fromTemplate ?? null,
        JSON.stringify(workout.exercises),
        ]
    )
}

export const insertTemplate = async (template: any) => {
    if (!db) return
  await db.runAsync(
    `INSERT INTO templates (id, name, description, tags, exercises, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      template.id,
      template.name,
      template.description ?? "",
      JSON.stringify(template.tags ?? []),
      JSON.stringify(template.exercises ?? []),
      template.createdAt,
      template.updatedAt ?? null,
    ]
  )
}

export const getAllWorkouts = async () => {
    if(!db) return []

  const results = db.getAllSync("SELECT * FROM workouts ORDER BY startTime DESC")
  return (results as any[]).map((res) => ({
    ...res,
    exercises: JSON.parse(res.exercises ?? "[]"),
    completed: res.completed === 1,
  }))
}

export const getAllTemplates = async () => {
    if(!db) return []

  const results = await db.getAllAsync("SELECT * FROM templates ORDER BY createdAt DESC")
  return (results as any[]).map((res) => ({
    ...res,
    exercises: JSON.parse(res.exercises ?? "[]"),
    tags: JSON.parse(res.tags ?? "[]"),
  }))
}

export const deleteWorkoutLocal = async (id: string) => {
  if (!db) return
  
  return db.runAsync(
    `DELETE FROM workouts WHERE id = ?`,
    [id]
  );
}

export async function updateWorkoutId(oldId: string, newId: string) {
  if (!db) return
  
  return db.runAsync(
    `UPDATE workouts SET id = ? WHERE id = ?`,
    [newId, oldId]
  );
}

export default db