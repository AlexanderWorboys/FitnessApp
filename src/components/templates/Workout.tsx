import { Button, ScrollView, View } from "react-native";
import { useWorkoutStore } from "../../store/WorkoutStore";
import { WorkoutSummary } from "../organisms/WorkoutSummary";
import ExercisePanel from "../organisms/ExercisePanel";
import { ExerciseType, setEntry, WorkoutExercise } from "../../types/workout";



export const Workout = () => {
    const { activeWorkout, startWorkout, addExercise } = useWorkoutStore()

    if (!activeWorkout) {
        return (
            <View className="flex-1 items-center justify-center">
                <Button title="Start New Workout" onPress={() => startWorkout("My Workout")} />
            </View>
        )
    }

    const createNewSet = (n = 1): setEntry => ({
        id: Date.now().toString(),
        setNumber: n,
        kg: 0,
        reps: 0,
        // note: use `complete` to match your type
        complete: false,
    });

    const handleAddExercise = () => {
        const newExercise: WorkoutExercise = {
            id: Date.now().toString(),
            name: "New Exercise",
            type: "weight",            // OK because newExercise is typed WorkoutExercise
            columns: [],               // optional, fine as []
            sets: [createNewSet(1)],   // returns setEntry[]
        };
        addExercise(newExercise)
    }

    return (
        <ScrollView className="flex-1 p-4 mb-10">
            <WorkoutSummary workout={activeWorkout} />

            {activeWorkout.exercises.map((exercise: WorkoutExercise) => (
                <ExercisePanel key={exercise.id} exercise={exercise} />
            ))}

            <View className="mt-6">
                <Button title="Add Exercise" onPress={handleAddExercise} />
            </View>
        </ScrollView>
    );



}