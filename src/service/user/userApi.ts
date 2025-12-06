import { apiClinet } from "../api/apiClient";

export const userApi = {
    signup: async (data: { email: string; password: string }) => {
        apiClinet.post('/auth', data)
    },
    
    login: (email: string, password: string) => apiClinet.post('/auth/login', { email, password }),
    getProfile: () => apiClinet.get('/user'),
}