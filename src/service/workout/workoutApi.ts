import axios from "axios";
import { Workout } from "../../types/workout";
import { URL } from "../../../config.local";

const API_URL = URL

export const workoutApi = {
    async createWorkout(workout: any) {
        const res = await axios.post(`${API_URL}/workouts`, {
            ...workout,
            startTime: new Date(workout.startTime).toISOString(),
            endTime: workout.endTime ? new Date(workout.endTime).toISOString() : null,
            status: workout.completed ? "completed" : "in_progress",
        });
        return res.data;
    },

    async getWorkouts() {
        const res = await axios.get(`${API_URL}/workouts`);
        return res.data;
    },

    async deleteWorkout(id: string) {
        return axios.delete(`${API_URL}/workouts/${id}`);
    },

}