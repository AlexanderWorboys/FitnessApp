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
        try {
            const res = await axios.get(`${API_URL}/workouts`);
            console.log("fetch result: ", res.data);
            return res.data;
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
    }

}