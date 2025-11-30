# Complete Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- MetaMask wallet
- Alchemy/Infura account (for blockchain RPC)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/purvai12/quiz-website-qvt.git
cd quiz-website-qvt
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Configure Backend Environment

```bash
cp .env.example .env
```

Edit `.env` file:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# MongoDB - Local
MONGODB_URI=mongodb://localhost:27017/quiz-website

# OR MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-website

JWT_SECRET=your_random_secret_key_here

# Get from https://www.alchemy.com/
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# Your wallet private key (DO NOT SHARE!)
PRIVATE_KEY=your_private_key_here

# Will be filled after deployment
CONTRACT_ADDRESS=
```

### 4. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas** (cloud database)

### 5. Deploy Smart Contract

```bash
cd backend
npx hardhat
# Select: Create a JavaScript project
# Press Enter for all prompts

# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia
```

Copy the contract address from output and add to `.env`:
```env
CONTRACT_ADDRESS=0x...your_contract_address
```

### 6. Start Backend Server

```bash
cd backend
npm run dev
```

Backend should be running on `http://localhost:5000`

### 7. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

### 8. Configure Frontend Environment

```bash
cp .env.example .env
```

Edit `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_CONTRACT_ADDRESS=your_contract_address_from_step_5
REACT_APP_NETWORK_NAME=sepolia
```

### 9. Start Frontend

```bash
cd frontend
npm start
```

Frontend should open at `http://localhost:3000`

## Testing the Application

### 1. Register a User

- Go to `http://localhost:3000/register`
- Create an account with email and password

### 2. Connect MetaMask

- Make sure MetaMask is on Sepolia testnet
- Click "Connect Wallet" button
- Approve the connection

### 3. Get Test ETH

Get Sepolia test ETH from faucets:
- https://sepoliafaucet.com/
- https://www.alchemy.com/faucets/ethereum-sepolia

### 4. Take a Quiz

- Browse available quizzes
- Take a quiz and submit answers
- View your score

### 5. Claim QVT Tokens

- After completing a quiz, click "Claim Rewards"
- Approve the transaction in MetaMask
- Receive 10 QVT tokens per correct answer

### 6. Check Leaderboard

- View your rank on the leaderboard
- See top performers

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/connect-wallet` - Connect wallet

### Quiz
- `GET /api/quiz` - Get all quizzes
- `GET /api/quiz/:id` - Get quiz details
- `POST /api/quiz/:id/submit` - Submit quiz
- `POST /api/quiz/create` - Create quiz

### User
- `GET /api/user/profile` - Get profile
- `GET /api/user/history` - Get quiz history
- `GET /api/user/stats` - Get statistics

### Blockchain
- `POST /api/blockchain/reward` - Claim QVT tokens
- `GET /api/blockchain/balance/:address` - Get token balance

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongooseServerSelectionError`

**Solution:**
- Make sure MongoDB is running: `mongod`
- Or use MongoDB Atlas connection string

### Smart Contract Deployment Failed

**Error:** `insufficient funds`

**Solution:**
- Get Sepolia test ETH from faucets
- Make sure you're on Sepolia network

### MetaMask Not Connecting

**Solution:**
- Install MetaMask extension
- Switch to Sepolia testnet
- Refresh the page

### Backend Not Starting

**Error:** `Port 5000 already in use`

**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
PORT=5001
```

## Production Deployment

### Backend (Heroku/Railway/Render)

1. Push code to GitHub
2. Connect to hosting platform
3. Add environment variables
4. Deploy

### Frontend (Vercel/Netlify)

1. Push code to GitHub
2. Connect to Vercel/Netlify
3. Add environment variables
4. Deploy

### Smart Contract (Mainnet)

⚠️ **WARNING:** Deploying to mainnet costs real ETH!

```bash
# Deploy to Ethereum mainnet
npx hardhat run scripts/deploy.js --network mainnet

# Or deploy to Polygon
npx hardhat run scripts/deploy.js --network polygon
```

## Security Best Practices

1. **Never commit `.env` files**
2. **Never share private keys**
3. **Use strong JWT secrets**
4. **Enable rate limiting in production**
5. **Use HTTPS in production**
6. **Validate all user inputs**
7. **Keep dependencies updated**

## Support

For issues or questions:
- Open an issue on GitHub
- Check existing issues for solutions

## License

MIT License - feel free to use for your projects!
