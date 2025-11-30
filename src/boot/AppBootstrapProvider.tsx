import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

// Pre loaded data before app starts - goes in app/_Layout
export const AppBootstrapProvider = ({ children }: { children: React.ReactNode }) => {

    const [fontsLoaded] = useFonts({
        "Inter-Bold": require('../../assets/fonts/Inter-Bold.ttf'),
        "Inter-ExtraBold": require('../../assets/fonts/Inter-ExtraBold.ttf'),
        "Inter-Light": require('../../assets/fonts/Inter-Light.ttf'),
        "Inter-Medium": require('../../assets/fonts/Inter-Medium.ttf'),
        "Inter-Regular": require('../../assets/fonts/Inter-Regular.ttf'),
        "Inter-SemiBold": require('../../assets/fonts/Inter-SemiBold.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return children;
}