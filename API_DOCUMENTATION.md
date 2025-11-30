# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User
```http
POST /api/auth/register
```

**Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "walletAddress": "0x..." // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "walletAddress": "0x...",
    "totalScore": 0,
    "qvtBalance": 0
  }
}
```

### Login
```http
POST /api/auth/login
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { ... }
}
```

### Connect Wallet
```http
POST /api/auth/connect-wallet
```
**Protected Route** 🔒

**Body:**
```json
{
  "walletAddress": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Wallet connected successfully",
  "user": { ... }
}
```

---

## Quiz Endpoints

### Get All Quizzes
```http
GET /api/quiz?category=Technology&difficulty=medium&page=1&limit=10
```

**Query Parameters:**
- `category` (optional): Filter by category
- `difficulty` (optional): easy, medium, hard
- `search` (optional): Search in title/description
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "pages": 5,
  "currentPage": 1,
  "quizzes": [
    {
      "_id": "quiz_id",
      "title": "JavaScript Basics",
      "description": "Test your JS knowledge",
      "category": "Technology",
      "difficulty": "medium",
      "questions": [...],
      "timeLimit": 600,
      "totalAttempts": 100,
      "averageScore": 75.5
    }
  ]
}
```

### Get Quiz by ID
```http
GET /api/quiz/:id
```

**Response:**
```json
{
  "success": true,
  "quiz": {
    "_id": "quiz_id",
    "title": "JavaScript Basics",
    "questions": [
      {
        "question": "What is JavaScript?",
        "options": ["Language", "Framework", "Library", "Tool"],
        "points": 1
      }
    ]
  }
}
```

### Submit Quiz
```http
POST /api/quiz/:id/submit
```
**Protected Route** 🔒

**Body:**
```json
{
  "answers": [0, 2, 1, 3],
  "timeTaken": 450
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quiz submitted successfully",
  "result": {
    "attemptId": "attempt_id",
    "score": 3,
    "totalQuestions": 4,
    "percentage": "75.00",
    "correctAnswers": 3,
    "timeTaken": 450
  }
}
```

### Create Quiz
```http
POST /api/quiz/create
```
**Protected Route** 🔒

**Body:**
```json
{
  "title": "React Fundamentals",
  "description": "Test your React knowledge",
  "category": "Technology",
  "difficulty": "medium",
  "timeLimit": 600,
  "questions": [
    {
      "question": "What is React?",
      "options": ["Library", "Framework", "Language", "Tool"],
      "correctAnswer": 0,
      "points": 1,
      "explanation": "React is a JavaScript library"
    }
  ]
}
```

---

## User Endpoints

### Get Profile
```http
GET /api/user/profile
```
**Protected Route** 🔒

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "walletAddress": "0x...",
    "totalScore": 150,
    "quizzesTaken": 10,
    "qvtBalance": 1500
  }
}
```

### Get Quiz History
```http
GET /api/user/history?page=1&limit=10
```
**Protected Route** 🔒

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 25,
  "attempts": [
    {
      "_id": "attempt_id",
      "quizId": {
        "title": "JavaScript Basics",
        "category": "Technology"
      },
      "score": 8,
      "totalQuestions": 10,
      "percentage": 80,
      "qvtRewarded": 80,
      "completedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Get User Stats
```http
GET /api/user/stats
```
**Protected Route** 🔒

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalScore": 150,
    "quizzesTaken": 10,
    "qvtBalance": 1500,
    "averageScore": "75.50",
    "bestScore": "95.00",
    "recentAttempts": [...]
  }
}
```

---

## Leaderboard Endpoints

### Get Leaderboard
```http
GET /api/leaderboard?page=1&limit=10&sortBy=totalScore
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `sortBy` (optional): totalScore, quizzesTaken, qvtBalance

**Response:**
```json
{
  "success": true,
  "leaderboard": [
    {
      "rank": 1,
      "userId": "user_id",
      "username": "topplayer",
      "totalScore": 500,
      "quizzesTaken": 50,
      "qvtBalance": 5000
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalUsers": 100
  }
}
```

### Get User Rank
```http
GET /api/leaderboard/user/:userId
```

**Response:**
```json
{
  "success": true,
  "rank": 15,
  "user": {
    "username": "johndoe",
    "totalScore": 150,
    "quizzesTaken": 10,
    "qvtBalance": 1500
  }
}
```

---

## Blockchain Endpoints

### Reward QVT Tokens
```http
POST /api/blockchain/reward
```
**Protected Route** 🔒

**Body:**
```json
{
  "attemptId": "attempt_id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "QVT tokens rewarded successfully",
  "qvtRewarded": 80,
  "transactionHash": "0x...",
  "explorerUrl": "https://sepolia.etherscan.io/tx/0x..."
}
```

### Get Token Balance
```http
GET /api/blockchain/balance/:walletAddress
```

**Response:**
```json
{
  "success": true,
  "balance": "1500.0",
  "balanceWei": "1500000000000000000000"
}
```

### Get Blockchain Stats
```http
GET /api/blockchain/stats/:walletAddress
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalScore": "150",
    "quizzesTaken": "10",
    "tokenBalance": "1500.0"
  }
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error (development only)"
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error
- `503` - Service Unavailable

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Header:** `X-RateLimit-Remaining`

---

## Integration Examples

### JavaScript/React
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Get quizzes
const quizzes = await api.get('/quiz');

// Submit quiz
const result = await api.post('/quiz/123/submit', {
  answers: [0, 1, 2],
  timeTaken: 300
});
```

### cURL
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get quizzes (with auth)
curl http://localhost:5000/api/quiz \
  -H "Authorization: Bearer YOUR_TOKEN"
```
