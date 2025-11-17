
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "../../src/components/atoms";
import { Avatar } from "../../src/components/atoms/Avatar";
import { UserCard } from "../../src/components/molecules/userCard";
import { ProgressCircle } from "../../src/components/molecules/ProgressCircle";
import { ChipGroup } from "../../src/components/molecules/ChipGroup";

export default function Home() {

  return (
    <ThemedView className="flex-1 justify-center content-center px-3">
      <UserCard />
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
    </ThemedView>
  );
}
