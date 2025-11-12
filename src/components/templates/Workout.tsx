import { FlatList, ScrollView, View, TouchableOpacity } from "react-native";
import { useWorkoutStore } from "../../store/WorkoutStore";
import { WorkoutSummary } from "../organisms/WorkoutSummary";
import ExercisePanel from "../organisms/ExercisePanel";
import { ExerciseType, setEntry, WorkoutExercise } from "../../types/workout";
import { getAllWorkouts } from "../../database/workoutDb";
import { Button, Text } from "../atoms";
import { useSheetStore } from "../../store/sheetStore";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";



export const Workout = () => {
    const { activeWorkout, startWorkout, addExercise, completeWorkout } = useWorkoutStore();
    const { sheetIndex} = useSheetStore();
    const sheetRef = useRef<BottomSheet>(null)
    //const workouts = getAllWorkouts()
    const { isOpen, closeSheet } = useSheetStore();

    if (!activeWorkout) {
        return (
            <View className="flex-1 items-center justify-center">
                <Button label="Start New Workout" onPress={() => startWorkout("My Workout")} />
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

    const handleComplete = useCallback(async () => {
            await completeWorkout()
            closeSheet()
    }, [completeWorkout])

    return (<>
        {activeWorkout ? (
            <>
                {sheetIndex === 0 ? (
                    <BottomSheetView className="flex-row justify-between items-center pb-20">
                        <Text className="font-semibold">{activeWorkout.name}</Text>
                        <TouchableOpacity onPress={() => sheetRef.current?.expand()}>
                            <Text className="text-blue-500">Expand</Text>
                        </TouchableOpacity>
                    </BottomSheetView>
                ) : (
                    <BottomSheetScrollView className="px-3">
                        <WorkoutSummary workout={activeWorkout} />

                        {activeWorkout?.exercises.map((exercise: WorkoutExercise) => (
                            <ExercisePanel key={exercise.id} exercise={exercise} />
                        ))}

                        <View className="mt-6">
                            <Button label="Add Exercise" onPress={handleAddExercise} />
                        </View>
                        <View className="mt-6">
                            <Button label="Finish Workout" onPress={handleComplete} />
                        </View>
                    </BottomSheetScrollView>
                )}
            </>
        ) : (
            <Text>No Active Workout</Text>
        )}
        </>
    );



}