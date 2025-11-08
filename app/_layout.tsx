import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { ThemeProvider } from "../src/theme/ThemeProvider";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { useWorkoutStore } from '../src/store/WorkoutStore';
import { getAllTemplates, initWorkoutDb } from '../src/database/workoutDb';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { WorkoutSheet } from '../src/components/templates/WorkoutSheet';

const MainLayout = () => {
  const setTemplates = useWorkoutStore((state) => state.setTemplates)
  const [fontsLoaded] = useFonts({
    "Inter-Bold": require('../assets/fonts/Inter-Bold.ttf'),
    "Inter-ExtraBold": require('../assets/fonts/Inter-ExtraBold.ttf'),
    "Inter-Light": require('../assets/fonts/Inter-Light.ttf'),
    "Inter-Medium": require('../assets/fonts/Inter-Medium.ttf'),
    "Inter-Regular": require('../assets/fonts/Inter-Regular.ttf'),
    "Inter-SemiBold": require('../assets/fonts/Inter-SemiBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const setupDb = async () => {
      await initWorkoutDb()
      const templates = await getAllTemplates()
      setTemplates(templates)
    }
    setupDb()
  }, [])

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default MainLayout;