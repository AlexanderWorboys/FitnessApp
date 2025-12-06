import { View } from "react-native"
import { Button, Input, Text } from "../../../components/atoms"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const LoginForm = () => {
    const handleLogin = async () => {
        console.log("Logging in...");
    }
    
    return (
        <View className="gap-4 mt-6 mb-4">
            <Input className="rounded-2xl" placeholder="Email Address" keyboardType="email-address" autoCapitalize="none" />
            <Input className="rounded-2xl" placeholder="Password" secureTextEntry autoCapitalize="none" />

            <Button label="Log In" onPress={handleLogin}/>
            <Button textClassName="text-primary" variant="ghost" label="Create an Account" onPress={() => router.push("/(auth)/signup")}/>
        </View>
    )
}