import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import BottomSheet, { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { Button, Text, ThemedView } from "../../src/components/atoms";
import { SafeAreaView } from "react-native-safe-area-context";
import { WorkoutSummary } from "../../src/components/organisms/WorkoutSummary";
import ExercisePanel from "../../src/components/organisms/ExercisePanel";
import { useWorkoutStore } from "../../src/store/WorkoutStore";
import { setEntry, WorkoutExercise } from "../../src/types/workout";

export default function Home() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '100%'], []);
  const { activeWorkout, completeWorkout, addExercise } = useWorkoutStore()

  const handleOpen = () => {
    bottomSheetRef.current?.snapToIndex(1); // Full screen
  };

  const handleCollapse = () => {
    bottomSheetRef.current?.close() // Collapse to 10%
  };

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
      bottomSheetRef.current?.close()
    }, [completeWorkout])

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
      <Button label="Open This modal dasdasda" onPress={handleOpen} />
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} enablePanDownToClose={false} backdropComponent={() => null}>
        <BottomSheetScrollView className="flex-1 p-5 h-full">
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
      </BottomSheet>
    </SafeAreaView>

  );
}
