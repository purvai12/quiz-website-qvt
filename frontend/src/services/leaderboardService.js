import api from '../config/api';

export const leaderboardService = {
    getLeaderboard: async (page = 1, limit = 10, sortBy = 'totalScore') => {
        const response = await api.get(`/leaderboard?page=${page}&limit=${limit}&sortBy=${sortBy}`);
        return response.data;
    },

    getUserRank: async (userId) => {
        const response = await api.get(`/leaderboard/user/${userId}`);
        return response.data;
    }
};
