import { Stack } from "expo-router";
import "./global.css";
import { ThemeProvider } from "../src/theme/ThemeProvider";

const MainLayout = () => {
    
    return (
        <ThemeProvider>
            <Stack screenOptions={{ headerShown: false}} />
        </ThemeProvider>
    )
}

export default MainLayout;