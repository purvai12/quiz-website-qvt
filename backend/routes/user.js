const express = require('express');
const router = express.Router();
const User = require('../models/User');
const QuizAttempt = require('../models/QuizAttempt');
const auth = require('../middleware/auth');

// Get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// Get user quiz history
router.get('/history', auth, async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const attempts = await QuizAttempt.find({ userId: req.userId })
            .populate('quizId', 'title category difficulty thumbnail')
            .sort({ completedAt: -1 })
            .limit(parseInt(limit))
            .skip(skip);

        const total = await QuizAttempt.countDocuments({ userId: req.userId });

        res.json({
            success: true,
            count: attempts.length,
            total,
            pages: Math.ceil(total / parseInt(limit)),
            currentPage: parseInt(page),
            attempts
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// Get user statistics
router.get('/stats', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        const attempts = await QuizAttempt.find({ userId: req.userId });

        const totalAttempts = attempts.length;
        const averageScore = totalAttempts > 0 
            ? attempts.reduce((sum, a) => sum + a.percentage, 0) / totalAttempts 
            : 0;

        const bestScore = totalAttempts > 0
            ? Math.max(...attempts.map(a => a.percentage))
            : 0;

        const recentAttempts = attempts
            .sort((a, b) => b.completedAt - a.completedAt)
            .slice(0, 5);

        const stats = {
            totalScore: user.totalScore,
            quizzesTaken: user.quizzesTaken,
            qvtBalance: user.qvtBalance,
            averageScore: averageScore.toFixed(2),
            bestScore: bestScore.toFixed(2),
            recentAttempts
        };

        res.json({ success: true, stats });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
    try {
        const { username, avatar } = req.body;
        const updateFields = {};

        if (username) updateFields.username = username;
        if (avatar) updateFields.avatar = avatar;

        const user = await User.findByIdAndUpdate(
            req.userId,
            updateFields,
            { new: true }
        ).select('-password');

        res.json({ success: true, message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

module.exports = router;
