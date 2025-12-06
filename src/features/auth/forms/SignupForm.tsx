import { View } from "react-native"
import { Button, Input, Text } from "../../../components/atoms"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const SignupForm = () => {
    const handleLogin = async () => {
        await AsyncStorage.setItem("authToken", "dummy-token");
        router.push("/(tabs)/home")
    }
    
    return (
        <View className="gap-4 mt-6 mb-4">
            <Input className="rounded-2xl" placeholder="Email Address" keyboardType="email-address" autoCapitalize="none" />
            <Input className="rounded-2xl" placeholder="Password" secureTextEntry autoCapitalize="none" />
            <Input className="rounded-2xl" placeholder="Confirm Password" secureTextEntry autoCapitalize="none" />

            <Button label="Create an Account" onPress={handleLogin}/>
            <Button textClassName="text-primary" variant="ghost" label="Log in" onPress={() => router.push("/(auth)/login")}/>
        </View>
    )
}