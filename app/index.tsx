import { Redirect } from "expo-router";
import { useAuthStore } from "../src/store/auth/useAuthStore";

export default function Index() {
  const { hydrated, isAuthenticated } = useAuthStore();

  if(!hydrated) return null;

  return isAuthenticated
    ? <Redirect href="/(tabs)/home" />
    : <Redirect href="/(auth)/onboarding" />;
}
