import BottomSheet, { BottomSheetScrollView, useBottomSheet } from "@gorhom/bottom-sheet";
import { Children, useEffect, useMemo, useRef, useState } from "react";
import { useUIStore } from "../../store/uiStore";
import { Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useWindowDimensions } from 'react-native';
import { useSheetStore } from "../../store/sheetStore";
import { useThemeStore } from "../../store/themeStore";

export const GlobalBottomSheet = () => {
    const { isOpen, closeSheet, setSheetIndex, content, snapPoints } = useSheetStore();
    const sheetRef = useRef<BottomSheet>(null)
    const snapPointss = useMemo(() => snapPoints, [])
    const { hideTabBar, setHideTabBar } = useUIStore()
    const sheetPosition = useSharedValue(1);
    const {theme} = useThemeStore();

    const themed = theme === "dark" ? '#1c1c1c' : '#ffffff'
    

    const onSheetChange = (index: number) => {
        setSheetIndex(index);
        const expanded = index > 0;
        setHideTabBar(expanded);
    }

    const onSheetAnimate = (index: number, position: number) => {
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
            enableOverDrag={false}
            backgroundStyle={{
                backgroundColor: themed,
            }}
            //simultaneousHandlers={scrollView}
        >
            <BottomSheetScrollView>
                {content}
            </BottomSheetScrollView>
            
        </BottomSheet>
    )
}