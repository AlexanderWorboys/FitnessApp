import { Button, Text, ThemedView } from "../../../components/atoms"
import { Divider } from "../../../components/atoms/Divider"
import { SignupForm } from "../forms/SignupForm"

const SignupScreen = () => {
    return (
        <ThemedView className="px-4 flex-1 justify-center">
            <Text varient="title" className="text-center mb-4">Create an Account</Text>
            <SignupForm />
            <Divider marginY="my-4" />

            <Button className="mb-2 mt-4 py-4" textClassName="text-black" label="Sign up with Google" variant="white" onPress={() => { }} />
            <Button className="my-2 py-4" leftIcon="logo-facebook" label="Sign up with Facebook" variant="blue" onPress={() => { }} />
            <Button className="my-2 py-4" leftIcon="logo-apple" label="Sign up with Apple" variant="black" onPress={() => { }} />
        </ThemedView>
    )
}

export default SignupScreen