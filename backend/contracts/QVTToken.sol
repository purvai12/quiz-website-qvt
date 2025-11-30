// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title QVTToken
 * @dev Quiz Vote Token - ERC20 token for rewarding quiz participants
 */
contract QVTToken is ERC20, Ownable {
    mapping(address => uint256) public userScores;
    mapping(address => uint256) public totalQuizzesTaken;
    mapping(uint256 => mapping(address => bool)) public quizCompleted;
    
    event TokensRewarded(address indexed user, uint256 amount, uint256 quizId, uint256 score);
    event QuizCompleted(address indexed user, uint256 quizId, uint256 score);
    
    constructor() ERC20("Quiz Vote Token", "QVT") Ownable(msg.sender) {
        _mint(msg.sender, 10_000_000 * 10 ** decimals());
    }
    
    function rewardUser(address user, uint256 score, uint256 quizId) external onlyOwner {
        require(user != address(0), "QVT: Invalid user address");
        require(score > 0, "QVT: Score must be greater than 0");
        require(!quizCompleted[quizId][user], "QVT: Quiz already rewarded");
        
        uint256 rewardAmount = score * 10 * 10 ** decimals();
        
        userScores[user] += score;
        totalQuizzesTaken[user] += 1;
        quizCompleted[quizId][user] = true;
        
        _transfer(owner(), user, rewardAmount);
        
        emit TokensRewarded(user, rewardAmount, quizId, score);
        emit QuizCompleted(user, quizId, score);
    }
    
    function getUserStats(address user) external view returns (
        uint256 totalScore,
        uint256 quizzesTaken,
        uint256 tokenBalance
    ) {
        return (
            userScores[user],
            totalQuizzesTaken[user],
            balanceOf(user)
        );
    }
    
    function hasCompletedQuiz(uint256 quizId, address user) external view returns (bool) {
        return quizCompleted[quizId][user];
    }
    
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
    
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
