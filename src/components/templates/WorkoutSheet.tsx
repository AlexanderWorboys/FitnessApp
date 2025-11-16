// import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet"
// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
// import { useWorkoutStore } from "../../store/workoutStore"
// import { WorkoutSummary } from "../organisms/WorkoutSummary"
// import ExercisePanel from "../organisms/ExercisePanel"
// import { Button } from "../atoms"
// import { TouchableOpacity, View, Text } from "react-native"
// import { setEntry, WorkoutExercise } from "../../types/workout"
// import { useSheetStore } from "../../store/sheetStore"
// import { useUIStore } from "../../store/uiStore"
// import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

// export const WorkoutSheet = React.forwardRef((props, ref) => {
//     const sheetRef = useRef<BottomSheet>(null)
//     const { activeWorkout, completeWorkout, addExercise } = useWorkoutStore()

//     const { isOpen, closeSheet } = useSheetStore();
//     const [sheetIndex, setSheetIndex] = useState(-1)
//     //const [isExpanded, setIsExpanded] = useState(false)
//     const { hideTabBar, setHideTabBar } = useUIStore()

//     const sheetPosition = useSharedValue(1);

//     const snapPoints = useMemo(() => ['10%', '90%'], []);

//     const onSheetChange = (index: number) => {
//         setSheetIndex(index);
//         console.log(index);
//         const expanded = index > 0;
//         setHideTabBar(expanded);
//     }

//     const onSheetAnimate = (index: number, position: number) => {
//         console.log(index, position)
//     sheetPosition.value = position; // Track the sheet's position in real-time
//   };

//     useEffect(() => {
//         if (isOpen) sheetRef.current?.expand()
//         else sheetRef.current?.close()
//     }, [isOpen])

//     const createNewSet = (n = 1): setEntry => ({
//         id: Date.now().toString(),
//         setNumber: n,
//         kg: 0,
//         reps: 0,
//         // note: use `complete` to match your type
//         complete: false,
//     });

//     const handleAddExercise = () => {
//         const newExercise: WorkoutExercise = {
//             id: Date.now().toString(),
//             name: "New Exercise",
//             type: "weight",            // OK because newExercise is typed WorkoutExercise
//             columns: [],               // optional, fine as []
//             sets: [createNewSet(1)],   // returns setEntry[]
//         };
//         addExercise(newExercise)
//     }

//     const handleComplete = useCallback(async () => {
//         await completeWorkout()
//         closeSheet()
//     }, [completeWorkout])



//     return (
//         <BottomSheet
//             ref={sheetRef}
//             index={-1}
//             snapPoints={snapPoints}
//             bottomInset={hideTabBar ? 0 : 80}
//             onChange={onSheetChange}
//             onAnimate={onSheetAnimate}
//         >
//             <BottomSheetScrollView className="flex-1 p-5">
//                 {activeWorkout ? (
//                     <>
//                         {sheetIndex === 0 ? (
//                             <BottomSheetView className="flex-row justify-between items-center pb-20">
//                                 <Text className="font-semibold">{activeWorkout.name}</Text>
//                                 <TouchableOpacity onPress={() => sheetRef.current?.expand()}>
//                                     <Text className="text-blue-500">Expand</Text>
//                                 </TouchableOpacity>
//                             </BottomSheetView>
//                         ) : (
//                             <>
//                                 <WorkoutSummary workout={activeWorkout} />

//                                 {activeWorkout?.exercises.map((exercise: WorkoutExercise) => (
//                                     <ExercisePanel key={exercise.id} exercise={exercise} />
//                                 ))}

//                                 <View className="mt-6">
//                                     <Button label="Add Exercise" onPress={handleAddExercise} />
//                                 </View>
//                                 <View className="mt-6">
//                                     <Button label="Finish Workout" onPress={handleComplete} />
//                                 </View>
//                             </>
//                         )}
//                     </>
//                 ) : (
//                     <Text>No Active Workout</Text>
//                 )}


//             </BottomSheetScrollView>
//         </BottomSheet>
//     )
// })
