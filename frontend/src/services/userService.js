import api from '../config/api';

export const userService = {
    getProfile: async () => {
        const response = await api.get('/user/profile');
        return response.data;
    },

    getHistory: async (page = 1, limit = 10) => {
        const response = await api.get(`/user/history?page=${page}&limit=${limit}`);
        return response.data;
    },

    getStats: async () => {
        const response = await api.get('/user/stats');
        return response.data;
    },

    updateProfile: async (profileData) => {
        const response = await api.put('/user/profile', profileData);
        return response.data;
    }
};
