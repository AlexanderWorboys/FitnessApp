import { useAuthStore } from "../../store/auth/useAuthStore";
import { userApi } from "./userApi"
import * as SecureStore from "expo-secure-store";

export const userRepo = {
    login: async (email: string, password: string) => {
        const response = await userApi.login(email, password);

        const { user, accessToken, refreshToken } = response.data;

        await SecureStore.setItemAsync("accessToken", accessToken);
        await SecureStore.setItemAsync("refreshToken", refreshToken);

        useAuthStore.getState().setUser(user);

        return user;
    },

    loadUserFromStorage: async () => {
        const token = await SecureStore.getItemAsync("accessToken");
        if (!token) return null;

        const response = await userApi.getProfile();
        const user = response.data;

        useAuthStore.getState().setUser(user);
        return user;
    },
};