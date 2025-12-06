import axios from "axios";
import { URL } from "../../../config.local";
import * as SecureStore from "expo-secure-store";

export const apiClinet = axios.create({
    baseURL: URL,
    timeout: 8000,
});

apiClinet.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync("accessToken");
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})