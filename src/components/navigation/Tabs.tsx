import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../../store/ui/themeStore";
// import Animated, {
//     useAnimatedStyle,
//     withTiming,
//     interpolate,
//     useSharedValue
// } from "react-native-reanimated"
// import { useUIStore } from "../../store/uiStore"
// import { useEffect, useRef } from "react"

export default function TabBar() {
    const { theme } = useThemeStore();
    //const hideTabBar = useUIStore((s) => s.hideTabBar)
    //const sheetPosition = useSharedValue(1);

    // const animatedStyle = useAnimatedStyle(() => {
    //     const tabBarHeight = interpolate(sheetPosition.value, [0, 1], [0, 70]); // As sheet collapses, decrease tab bar height
    //     const tabBarOpacity = interpolate(sheetPosition.value, [0, 1], [0, 1]); // Fade tab bar in/out as sheet expands/collapses
    //     console.log(tabBarHeight, tabBarOpacity)
    //     return {
    //     height: withTiming(tabBarHeight, { duration: 300 }),
    //     opacity: withTiming(tabBarOpacity, { duration: 300 }),
    //     };
    // });

    const tabBarBackgroundColors = {
        light: '#ffffff', // your light mode bg-nav-light
        dark: '#121212',  // your dark mode bg-nav-dark
    };

    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "#28D8FF",
                    tabBarStyle: {
                        backgroundColor: tabBarBackgroundColors[theme],
                        borderTopWidth: 0.5,
                        borderTopColor: "#6B7280",
                        position: "absolute"
                    }
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                        title: "Explore",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="search" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="create-workout"
                    options={{
                        title: "Create",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="add-circle" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="history"
                    options={{
                        title: "Logs",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="book" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person-circle-outline" color={color} size={size} />
                        ),
                    }}
                />
            </Tabs>

            {/* <Animated.View
                pointerEvents="none"
                className="absolute bottom-0 left-0 right-0 bg-transparent"
                style={[{
                    backgroundColor: tabBarBackgroundColors[theme],
                    borderTopWidth: 0.5,
                    borderTopColor: "#6B7280",
                }, animatedStyle]}
            /> */}
        </>
    );
}
