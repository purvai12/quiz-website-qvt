const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const User = require('../models/User');
const QuizAttempt = require('../models/QuizAttempt');
const auth = require('../middleware/auth');

let provider, wallet, contract;

try {
    if (process.env.RPC_URL && process.env.PRIVATE_KEY && process.env.CONTRACT_ADDRESS) {
        provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
        wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        
        const contractABI = [
            "function rewardUser(address user, uint256 score, uint256 quizId) external",
            "function getUserStats(address user) external view returns (uint256 totalScore, uint256 quizzesTaken, uint256 tokenBalance)",
            "function balanceOf(address account) external view returns (uint256)"
        ];
        
        contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);
        console.log('✅ Blockchain connection initialized');
    } else {
        console.warn('⚠️  Blockchain configuration incomplete');
    }
} catch (error) {
    console.error('❌ Blockchain initialization error:', error.message);
}

// Reward QVT tokens
router.post('/reward', auth, async (req, res) => {
    try {
        if (!contract) {
            return res.status(503).json({ success: false, message: 'Blockchain service not available' });
        }

        const { attemptId } = req.body;
        const attempt = await QuizAttempt.findById(attemptId);
        
        if (!attempt || attempt.userId.toString() !== req.userId) {
            return res.status(404).json({ success: false, message: 'Quiz attempt not found' });
        }

        if (attempt.qvtRewarded > 0) {
            return res.status(400).json({ success: false, message: 'Tokens already rewarded' });
        }

        const user = await User.findById(attempt.userId);
        if (!user.walletAddress) {
            return res.status(400).json({ success: false, message: 'Please connect your wallet first' });
        }

        const tx = await contract.rewardUser(user.walletAddress, attempt.score, attempt.quizId);
        await tx.wait();

        const qvtRewarded = attempt.score * 10;
        attempt.qvtRewarded = qvtRewarded;
        attempt.transactionHash = tx.hash;
        await attempt.save();

        user.qvtBalance += qvtRewarded;
        await user.save();

        res.json({
            success: true,
            message: 'QVT tokens rewarded successfully',
            qvtRewarded,
            transactionHash: tx.hash,
            explorerUrl: `https://sepolia.etherscan.io/tx/${tx.hash}`
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Blockchain error', error: error.message });
    }
});

// Get token balance
router.get('/balance/:walletAddress', async (req, res) => {
    try {
        if (!contract) {
            return res.status(503).json({ success: false, message: 'Blockchain service not available' });
        }

        const balance = await contract.balanceOf(req.params.walletAddress);
        res.json({
            success: true,
            balance: ethers.formatEther(balance),
            balanceWei: balance.toString()
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Blockchain error', error: error.message });
    }
});

module.exports = router;
