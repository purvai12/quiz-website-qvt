import api from '../config/api';
import { ethers } from 'ethers';

export const blockchainService = {
    connectMetaMask: async () => {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }

        try {
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            return accounts[0];
        } catch (error) {
            throw new Error('User rejected the request');
        }
    },

    getWalletAddress: async () => {
        if (typeof window.ethereum === 'undefined') {
            return null;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        return await signer.getAddress();
    },

    rewardTokens: async (attemptId) => {
        const response = await api.post('/blockchain/reward', { attemptId });
        return response.data;
    },

    getBlockchainStats: async (walletAddress) => {
        const response = await api.get(`/blockchain/stats/${walletAddress}`);
        return response.data;
    },

    getTokenBalance: async (walletAddress) => {
        const response = await api.get(`/blockchain/balance/${walletAddress}`);
        return response.data;
    },

    getContractInfo: async () => {
        const response = await api.get('/blockchain/contract-info');
        return response.data;
    }
};
