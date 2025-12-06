// import axios from "axios";
// import { Workout } from "../../types/workout";
//import { URL } from "../../../config.local";
import { apiClinet } from "../api/apiClient";

//const API_URL = URL

export const workoutApi = {
    async createWorkout(workout: any) {
        const res = await apiClinet.post(`/workouts`, {
            ...workout,
            startTime: new Date(workout.startTime).toISOString(),
            endTime: workout.endTime ? new Date(workout.endTime).toISOString() : null,
            status: workout.completed ? "completed" : "in_progress",
        });
        return res.data;
    },

    async getWorkouts() {
        const res = await apiClinet.get(`/workouts`);
        return res.data;
    },

    async deleteWorkout(id: string) {
        console.log(id)
        return apiClinet.delete(`/workouts/${id}`);
    },

}