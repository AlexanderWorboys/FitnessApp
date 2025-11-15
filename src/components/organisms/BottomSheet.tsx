import BottomSheet, { BottomSheetScrollView, useBottomSheet } from "@gorhom/bottom-sheet";
import { Children, useEffect, useMemo, useRef, useState } from "react";
import { useUIStore } from "../../store/uiStore";
import { Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useWindowDimensions } from 'react-native';
import { useSheetStore } from "../../store/sheetStore";
import { useThemeStore } from "../../store/themeStore";

export const GlobalBottomSheet = () => {
    const { sheetIndex, isOpen, closeSheet, setSheetIndex, content, snapPoints } = useSheetStore();
    const sheetRef = useRef<BottomSheet>(null)
    const snapPointss = useMemo(() => snapPoints, [])
    //const [sheetIndex, setSheetIndex] = useState(-1)
    const { hideTabBar, setHideTabBar } = useUIStore()
    const sheetPosition = useSharedValue(1);
    const {theme} = useThemeStore();

    //test
    // const { animatedPosition } = useBottomSheet();
    // const { height: screenHeight } = useWindowDimensions();
    // const snapPointValues = useMemo(() => {
    //     return snapPoints.map(pct => screenHeight * (parseFloat(pct) / 100));
    // }, [screenHeight]);


    // const animatedStyle = useAnimatedStyle(() => {
    //     const progress = interpolate(
    //         animatedPosition.value,
    //         [snapPointValues[0], snapPointValues[1]],
    //         [0, 1],
    //         Extrapolation.CLAMP
    //     );

    //     return {
    //         opacity: progress,
    //         transform: [{ scale: progress }],
    //     };
    // });
    // console.log(animatedStyle);
    //test

    const themed = theme === "dark" ? '#1c1c1c' : '#ffffff'
    

    const onSheetChange = (index: number) => {
        setSheetIndex(index);
        const expanded = index > 0;
        setHideTabBar(expanded);
    }

    const onSheetAnimate = (index: number, position: number) => {
        console.log(index, position)
        sheetPosition.value = position; // Track the sheet's position in real-time
  };

  useEffect(() => {
          if (isOpen) sheetRef.current?.expand()
          else sheetRef.current?.close()
      }, [isOpen])

    return (
        <BottomSheet
            ref={sheetRef}
            index={-1}
            snapPoints={snapPointss}
            onChange={onSheetChange}
            onAnimate={onSheetAnimate}
            backgroundStyle={{
                backgroundColor: themed,
            }}
        >
            <BottomSheetScrollView>
                {content}
            </BottomSheetScrollView>
            
        </BottomSheet>
    )
}