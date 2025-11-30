import api from '../config/api';

export const quizService = {
    getAllQuizzes: async (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        const response = await api.get(`/quiz?${params}`);
        return response.data;
    },

    getQuizById: async (quizId) => {
        const response = await api.get(`/quiz/${quizId}`);
        return response.data;
    },

    submitQuiz: async (quizId, answers, timeTaken) => {
        const response = await api.post(`/quiz/${quizId}/submit`, {
            answers,
            timeTaken
        });
        return response.data;
    },

    getQuizResults: async (quizId, attemptId) => {
        const response = await api.get(`/quiz/${quizId}/results/${attemptId}`);
        return response.data;
    },

    createQuiz: async (quizData) => {
        const response = await api.post('/quiz/create', quizData);
        return response.data;
    },

    getCategories: async () => {
        const response = await api.get('/quiz/meta/categories');
        return response.data;
    }
};
