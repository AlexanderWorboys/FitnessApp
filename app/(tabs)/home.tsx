
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "../../src/components/atoms";
import { Avatar } from "../../src/components/atoms/Avatar";
import { UserCard } from "../../src/components/molecules/userCard";

export default function Home() {

  return (
    <ThemedView className="flex-1 h-full justify-center content-center px-3">
      <UserCard />
    </ThemedView>
  );
}
