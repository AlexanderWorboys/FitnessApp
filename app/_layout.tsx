import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { Slot, SplashScreen, Stack } from "expo-router";
import "./global.css";
import { ThemeProvider } from "../src/theme/ThemeProvider";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { getAllTemplates, initWorkoutDb } from '../src/database/workoutDb';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';
import { useWorkoutStore } from '../src/store/workout/useWorkoutStore';
import { startSyncListener } from '../src/store/sync/startSyncListener';
import { AppBootstrapProvider } from '../src/boot/AppBootstrapProvider';

const MainLayout = () => {
  const setTemplates = useWorkoutStore((state) => state.setTemplates)


  useEffect(() => {
    const setupDb = async () => {
      await initWorkoutDb()
      useWorkoutStore.getState().loadWorkoutHistory();
      const templates = await getAllTemplates()
      setTemplates(templates)
    }
    setupDb()
  }, [])

  useEffect(() => {
    startSyncListener();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppBootstrapProvider>
          <ThemeProvider>
            <Slot />
          </ThemeProvider>
      </AppBootstrapProvider>
    </GestureHandlerRootView>
  )
}

export default MainLayout;