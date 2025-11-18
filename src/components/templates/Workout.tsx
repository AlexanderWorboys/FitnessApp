import { View, TouchableOpacity } from "react-native";
import { useWorkoutStore } from "../../store/workoutStore";
import { WorkoutSummary } from "../organisms/WorkoutSummary";
import ExercisePanel from "../organisms/ExercisePanel";
import { WorkoutExercise } from "../../types/workout";
import { Button, Text } from "../atoms";
import { useSheetStore } from "../../store/sheetStore";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from "react";
import AddExerciseModal from "../modals/AddExerciseModal";



export const Workout = () => {
    const { activeWorkout, startWorkout, addExercise, completeWorkout, cancelWorkout } = useWorkoutStore();
    const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
    const { sheetIndex, closeSheet } = useSheetStore();
    const sheetRef = useRef<BottomSheet>(null)
    const openAddExerciseModal = () => setShowAddExerciseModal(true);
    const closeAddExerciseModal = () => setShowAddExerciseModal(false);

    const handleComplete = useCallback(async () => {
        await completeWorkout()
        closeSheet()
    }, [completeWorkout])

    const handleCancel = () => {
        closeSheet();
        cancelWorkout()
    }

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
                            <Button label="Add Exercise" onPress={openAddExerciseModal} />
                        </View>


                        <View className="mt-6">
                            <Button label="Finish Workout" onPress={handleComplete} />
                        </View>

                        <View className="mt-6">
                            <Button label="Cancel Workout" onPress={handleCancel} />
                        </View>
                    </BottomSheetScrollView>
                )}
            </>
        ) : (
            <View className="flex-1 items-center justify-center">
                <Button label="Start New Workout" onPress={() => startWorkout("My Workout")} />
            </View>
        )}

        <AddExerciseModal
            visible={showAddExerciseModal}
            onClose={closeAddExerciseModal}
        />
    </>
    );



}