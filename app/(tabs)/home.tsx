
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ThemedView } from "../../src/components/atoms";
import { Avatar } from "../../src/components/atoms/Avatar";
import { UserCard } from "../../src/components/molecules/userCard";
import { ProgressCircle } from "../../src/components/molecules/ProgressCircle";
import { ChipGroup } from "../../src/components/molecules/ChipGroup";
import { View } from "react-native";
import { Portal } from "@gorhom/portal";

export default function Home() {

  return (
    <SafeAreaView>
      <ThemedView className="gap-2 px-3">
        <UserCard username="Alex" />
        <ProgressCircle progress={1000} goal={2000} />
        <ChipGroup
          items={["60 - 90 Mins", "Chest", "Shoulders", "Intermediate"]}
          className="mt-2"
        />
        <ChipGroup
          items={["60 - 90 Mins", "Chest"]}
          className="mt-2"
        />
        <ChipGroup
          items={["Chest"]}
          className="mt-2"
        />


        <Button label="primary" onPress={() => { }} />
        <Button label="danger" variant="danger" onPress={() => { }} />
        <Button leftIcon="logo-apple" label="Sign in with Apple" variant="black" onPress={() => { }} />
        <Button leftIcon="logo-facebook" label="Sign in with Facebook" variant="blue" onPress={() => { }} />
      </ThemedView>
    </SafeAreaView>
  );
}
