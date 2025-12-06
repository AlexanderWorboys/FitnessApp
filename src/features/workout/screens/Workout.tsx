import { View, TouchableOpacity } from "react-native";
import { WorkoutExercise } from "../../../types/workout";
import { Button, Text } from "../../../components/atoms";
import { useSheetStore } from "../../../store/ui/sheetStore";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import AddExerciseModal from "./AddExerciseModal";
import { Divider } from "../../../components/atoms/Divider";
import TimerDisplay from "../../../components/molecules/Timer";
import { useWorkoutStore } from "../../../store/workout/useWorkoutStore";
import { WorkoutSummary } from "../components/WorkoutSummary";
import ExercisePanel from "../components/ExercisePanel";



export const Workout = () => {
    const { activeWorkout, startWorkout, addExercise, completeWorkout, cancelWorkout } = useWorkoutStore();
    const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
    const { sheetIndex, closeSheet } = useSheetStore();
    const sheetRef = useRef<BottomSheet>(null);
    const openAddExerciseModal = () => setShowAddExerciseModal(true);
    const closeAddExerciseModal = () => setShowAddExerciseModal(false);


    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
            const startTimestamp = new Date(activeWorkout?.startTime).getTime();
    
            const interval = setInterval(() => {
                const now = Date.now();
                const secondsElapsed = Math.floor((now - startTimestamp) / 1000);
                setElapsed(secondsElapsed);
            }, 1000);
    
            return () => clearInterval(interval);
        }, [activeWorkout?.startTime]);

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
                    <BottomSheetView className="flex-row justify-between items-center pb-20 px-4">
                        <TimerDisplay elapsed={elapsed} />
                        <Text className="font-semibold">{activeWorkout.name}</Text>
                    </BottomSheetView>
                ) : (
                    <View className="px-4">
                        <WorkoutSummary workout={activeWorkout} elapsed={elapsed} />

                        {activeWorkout?.exercises.map((exercise: WorkoutExercise) => (
                            <ExercisePanel key={exercise.id} exercise={exercise} />
                        ))}

                        <View className="mt-6">
                            <Button label="Add Exercise" onPress={openAddExerciseModal} />
                        </View>

                        <Divider marginY="my-8" />

                        <View className="">
                            <Button label="Finish Workout" onPress={handleComplete} />
                        </View>

                        <View className="mt-6 mb-14">
                            <Button variant="danger" label="Cancel Workout" onPress={handleCancel} />
                        </View>
                    </View>
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