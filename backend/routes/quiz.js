const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all quizzes
router.get('/', async (req, res) => {
    try {
        const { category, difficulty, search, page = 1, limit = 10 } = req.query;
        let filter = { isActive: true };

        if (category && category !== 'all') filter.category = category;
        if (difficulty && difficulty !== 'all') filter.difficulty = difficulty;
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const quizzes = await Quiz.find(filter)
            .select('-questions.correctAnswer -questions.explanation')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(skip)
            .populate('createdBy', 'username');

        const total = await Quiz.countDocuments(filter);

        res.json({
            success: true,
            count: quizzes.length,
            total,
            pages: Math.ceil(total / parseInt(limit)),
            currentPage: parseInt(page),
            quizzes
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// Get quiz by ID
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
            .select('-questions.correctAnswer -questions.explanation')
            .populate('createdBy', 'username');

        if (!quiz) {
            return res.status(404).json({ success: false, message: 'Quiz not found' });
        }

        res.json({ success: true, quiz });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// Submit quiz
router.post('/:id/submit', auth, async (req, res) => {
    try {
        const { answers, timeTaken } = req.body;
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({ success: false, message: 'Quiz not found' });
        }

        let score = 0;
        const processedAnswers = [];

        quiz.questions.forEach((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            if (isCorrect) score += question.points;
            processedAnswers.push({
                questionId: question._id,
                selectedAnswer: userAnswer,
                isCorrect
            });
        });

        const totalQuestions = quiz.questions.length;
        const percentage = (score / totalQuestions) * 100;

        const attempt = new QuizAttempt({
            userId: req.userId,
            quizId: quiz._id,
            answers: processedAnswers,
            score,
            totalQuestions,
            percentage,
            timeTaken: timeTaken || 0
        });

        await attempt.save();

        await User.findByIdAndUpdate(req.userId, {
            $inc: { totalScore: score, quizzesTaken: 1 }
        });

        res.json({
            success: true,
            message: 'Quiz submitted successfully',
            result: {
                attemptId: attempt._id,
                score,
                totalQuestions,
                percentage: percentage.toFixed(2),
                correctAnswers: score,
                timeTaken
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// Create quiz
router.post('/create', auth, async (req, res) => {
    try {
        const { title, description, category, difficulty, questions, timeLimit, thumbnail } = req.body;

        if (!title || !description || !category || !questions || questions.length === 0) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }

        const quiz = new Quiz({
            title,
            description,
            category,
            difficulty: difficulty || 'medium',
            questions,
            timeLimit: timeLimit || 600,
            thumbnail: thumbnail || '',
            createdBy: req.userId
        });

        await quiz.save();
        res.status(201).json({ success: true, message: 'Quiz created successfully', quiz });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

module.exports = router;
