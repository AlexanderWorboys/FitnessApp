import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const token = await AsyncStorage.getItem("authToken");
      setAuthToken(token);
      setLoading(false);
    };
    restoreSession();
  }, []);

  if (loading) return null;
  console.log("Auth Token in Index:", authToken);

  return authToken
    ? <Redirect href="/(tabs)/home" />
    : <Redirect href="/(auth)/onboarding" />;
}
