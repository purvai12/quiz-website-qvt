# Quiz Website Frontend

React frontend for the Quiz Website with QVT token integration.

## Integration with Your Figma Design

This frontend provides service files that you can integrate with your existing Figma design components.

### Quick Integration Examples

#### Login Component
```javascript
import { authService } from './services/authService';

const handleLogin = async (email, password) => {
    try {
        const data = await authService.login({ email, password });
        console.log('Login successful:', data);
        // Redirect to dashboard
    } catch (error) {
        console.error('Login failed:', error);
    }
};
```

#### Quiz List Component
```javascript
import { quizService } from './services/quizService';

const fetchQuizzes = async () => {
    try {
        const data = await quizService.getAllQuizzes({ 
            category: 'Technology',
            difficulty: 'medium'
        });
        setQuizzes(data.quizzes);
    } catch (error) {
        console.error('Failed to fetch quizzes:', error);
    }
};
```

#### Wallet Connect Component
```javascript
import { blockchainService } from './services/blockchainService';
import { authService } from './services/authService';

const handleConnectWallet = async () => {
    try {
        const walletAddress = await blockchainService.connectMetaMask();
        await authService.connectWallet(walletAddress);
        console.log('Wallet connected:', walletAddress);
    } catch (error) {
        console.error('Wallet connection failed:', error);
    }
};
```

## Available Services

- **authService**: Login, Register, Logout, Connect Wallet
- **quizService**: Get Quizzes, Submit Quiz, Get Results
- **userService**: Profile, History, Stats
- **leaderboardService**: Get Leaderboard, User Rank
- **blockchainService**: Connect Wallet, Reward Tokens, Get Balance

## Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and configure
3. Start development server: `npm start`

## Environment Variables

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_CONTRACT_ADDRESS=your_contract_address
REACT_APP_NETWORK_NAME=sepolia
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.
