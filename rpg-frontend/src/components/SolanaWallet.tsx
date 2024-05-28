import React, { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';

const SolanaWallet: React.FC = () => {
    const [walletProvider, setWalletProvider] = useState<string>("");
    const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const wallet = useWallet();

    useEffect(() => {
        const savedWalletProvider = localStorage.getItem('walletProvider');
        if (savedWalletProvider) {
            connectWallet(savedWalletProvider);
        }
    }, []);

    useEffect(() => {
        if (wallet.connected && wallet.publicKey) {
            setPublicKey(wallet.publicKey);
            fetchBalance(wallet.publicKey);
        }
    }, [wallet.connected, wallet.publicKey]);

    const connectWallet = async (provider: string) => {
        try {
            let walletAdapter;
            if (provider === "phantom") {
                walletAdapter = new PhantomWalletAdapter();
            } else if (provider === "solflare") {
                walletAdapter = new SolflareWalletAdapter();
            }
            if (walletAdapter) {
                await walletAdapter.connect();
                setWalletProvider(provider);
                setPublicKey(walletAdapter.publicKey);
                localStorage.setItem('walletProvider', provider);
            }
        } catch (err) {
            console.error('Failed to connect:', err);
        }
    };

    const disconnectWallet = async () => {
        await wallet.disconnect();
        setPublicKey(null);
        setBalance(null);
        setWalletProvider("");
        localStorage.removeItem('walletProvider');
    };

    const fetchBalance = async (publicKey: PublicKey) => {
        const connection = new Connection('https://api.devnet.solana.com');
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / 1e9); // Convert lamports to SOL
    };

    return (
        <div>
            <h1>Solana Wallet Connection</h1>
            {publicKey ? (
                <div>
                    <p>Connected with {walletProvider.toUpperCase()} as: {publicKey.toBase58()}</p>
                    <button onClick={disconnectWallet}>Disconnect Wallet</button>
                    <p>Balance: {balance} SOL</p>
                </div>
            ) : (
                <div>
                    <button onClick={() => connectWallet("phantom")}>Connect Phantom Wallet</button>
                    <button onClick={() => connectWallet("solflare")}>Connect Solflare Wallet</button>
                </div>
            )}
        </div>
    );
};

export default SolanaWallet;
