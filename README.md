# Quiz Website with QVT Token Rewards

A full-stack quiz application with MongoDB backend and Solidity-based QVT token rewards system.

## 🚀 Features

- User authentication with JWT
- Quiz creation and management
- Real-time leaderboard
- QVT token rewards via smart contract
- Wallet integration (MetaMask)
- MongoDB database
- RESTful API

## 📁 Project Structure

```
quiz-website-qvt/
├── backend/              # Node.js/Express backend
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── contracts/       # Solidity smart contracts
│   ├── scripts/         # Deployment scripts
│   └── server.js        # Main server file
└── frontend/            # React frontend
    ├── src/
    │   ├── services/    # API services
    │   ├── config/      # Configuration
    │   └── pages/       # React components
    └── public/
```

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Axios
- Ethers.js
- React Router

**Backend:**
- Node.js
- Express.js
- MongoDB/Mongoose
- JWT Authentication
- Ethers.js

**Blockchain:**
- Solidity
- Hardhat
- OpenZeppelin Contracts
- ERC20 Token Standard

## 📦 Installation

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

### Smart Contract Deployment

```bash
cd backend
npx hardhat run scripts/deploy.js --network sepolia
# Copy the contract address to .env
```

## 🔧 Configuration

### Backend Environment Variables (.env)

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

MONGODB_URI=mongodb://localhost:27017/quiz-website
JWT_SECRET=your_super_secret_jwt_key

RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=deployed_contract_address
```

### Frontend Environment Variables (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_CONTRACT_ADDRESS=your_contract_address
REACT_APP_NETWORK_NAME=sepolia
```

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/purvai12/quiz-website-qvt.git
cd quiz-website-qvt
```

2. **Install dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Configure environment variables**
```bash
# Copy and edit .env files in both backend and frontend
```

4. **Start MongoDB**
```bash
mongod
```

5. **Deploy Smart Contract**
```bash
cd backend
npx hardhat run scripts/deploy.js --network sepolia
```

6. **Start Backend**
```bash
cd backend
npm run dev
```

7. **Start Frontend**
```bash
cd frontend
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/connect-wallet` - Connect wallet
- `GET /api/auth/me` - Get current user

### Quiz
- `GET /api/quiz` - Get all quizzes
- `GET /api/quiz/:id` - Get specific quiz
- `POST /api/quiz/:id/submit` - Submit quiz answers
- `GET /api/quiz/:id/results/:attemptId` - Get quiz results
- `POST /api/quiz/create` - Create new quiz

### User
- `GET /api/user/profile` - Get user profile
- `GET /api/user/history` - Get quiz history
- `GET /api/user/stats` - Get user statistics
- `PUT /api/user/profile` - Update profile

### Leaderboard
- `GET /api/leaderboard` - Get leaderboard
- `GET /api/leaderboard/user/:userId` - Get user rank

### Blockchain
- `POST /api/blockchain/reward` - Reward QVT tokens
- `GET /api/blockchain/balance/:walletAddress` - Get token balance
- `GET /api/blockchain/stats/:walletAddress` - Get blockchain stats
- `GET /api/blockchain/contract-info` - Get contract information

## 🎮 How It Works

1. **User Registration**: Users create an account with email and password
2. **Take Quiz**: Users browse and take quizzes from various categories
3. **Submit Answers**: Quiz answers are submitted and scored automatically
4. **Connect Wallet**: Users connect their MetaMask wallet
5. **Earn Tokens**: Users receive QVT tokens (10 QVT per correct answer)
6. **Leaderboard**: Users compete on the global leaderboard

## 🔐 Smart Contract

The QVT Token is an ERC20 token that rewards users for quiz participation:
- **Token Name**: Quiz Vote Token
- **Symbol**: QVT
- **Decimals**: 18
- **Reward**: 10 QVT per correct answer

## 📝 License

MIT

## 👨‍💻 Author

Purvai Naik

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!
