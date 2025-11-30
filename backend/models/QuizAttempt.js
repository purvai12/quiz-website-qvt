const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    answers: [{
        questionId: mongoose.Schema.Types.ObjectId,
        selectedAnswer: Number,
        isCorrect: Boolean
    }],
    score: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    timeTaken: {
        type: Number
    },
    qvtRewarded: {
        type: Number,
        default: 0
    },
    transactionHash: {
        type: String,
        default: ''
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
});

quizAttemptSchema.index({ userId: 1, completedAt: -1 });
quizAttemptSchema.index({ quizId: 1 });

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
