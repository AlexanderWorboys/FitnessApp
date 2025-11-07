import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../../src/store/themeStore";

export default function TabsLayout() {
    const { theme } = useThemeStore();

    const tabBarBackgroundColors = {
        light: '#ffffff', // your light mode bg-nav-light
        dark: '#313131',  // your dark mode bg-nav-dark
    };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#28D8FF",
        tabBarStyle: {
          backgroundColor: tabBarBackgroundColors[theme],
          borderTopWidth: 0.5,
          borderTopColor: "#6B7280",
        },
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
        name="create-workout"
        options={{
          title: "Create Workout",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fitness-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" color={color} size={size} />
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
  );
}
