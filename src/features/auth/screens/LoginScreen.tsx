import { Button, Text, ThemedView } from "../../../components/atoms"
import { Divider } from "../../../components/atoms/Divider"
import { LoginForm } from "../forms/LoginForm"

const LoginScreen = () => {
    return (
        <ThemedView className="px-4 flex-1 justify-center">
            <Text varient="title" className="text-center mb-4">Log In</Text>
            <LoginForm />
            <Divider marginY="my-4" />

            <Button className="mb-2 mt-4 py-4" textClassName="text-black" label="Sign in with Google" variant="white" onPress={() => { }} />
            <Button className="my-2 py-4" leftIcon="logo-facebook" label="Sign in with Facebook" variant="blue" onPress={() => { }} />
            <Button className="my-2 py-4" leftIcon="logo-apple" label="Sign in with Apple" variant="black" onPress={() => { }} />
        </ThemedView>
    )
}

export default LoginScreen