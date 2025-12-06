import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { Redirect, Slot } from "expo-router";
import "./global.css";
import { ThemeProvider } from "../src/theme/ThemeProvider";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppBootstrapProvider } from '../src/boot/AppBootstrapProvider';
import { useAuthStore } from '../src/store/auth/useAuthStore';

const MainLayout = () => {

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