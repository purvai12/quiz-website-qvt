const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get leaderboard
router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sortBy = 'totalScore' } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const sortOptions = {};
        sortOptions[sortBy] = -1;

        const leaderboard = await User.find({ isActive: true })
            .select('username totalScore quizzesTaken qvtBalance avatar')
            .sort(sortOptions)
            .limit(parseInt(limit))
            .skip(skip);

        const total = await User.countDocuments({ isActive: true });

        res.json({
            success: true,
            leaderboard: leaderboard.map((user, index) => ({
                rank: skip + index + 1,
                userId: user._id,
                username: user.username,
                avatar: user.avatar,
                totalScore: user.totalScore,
                quizzesTaken: user.quizzesTaken,
                qvtBalance: user.qvtBalance
            })),
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalUsers: total,
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// Get user rank
router.get('/user/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const rank = await User.countDocuments({
            totalScore: { $gt: user.totalScore },
            isActive: true
        }) + 1;

        res.json({
            success: true,
            rank,
            user: {
                username: user.username,
                totalScore: user.totalScore,
                quizzesTaken: user.quizzesTaken,
                qvtBalance: user.qvtBalance
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

module.exports = router;
