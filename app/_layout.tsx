import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { Stack } from "expo-router";
import "./global.css";
import { ThemeProvider } from "../src/theme/ThemeProvider";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const MainLayout = () => {
    
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <Stack screenOptions={{ headerShown: false}} />
            </ThemeProvider>
        </GestureHandlerRootView>
    )
}

export default MainLayout;