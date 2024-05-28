import React, { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import Solflare from '@solflare-wallet/sdk';

const SolanaWallet: React.FC = () => {
    const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [walletProvider, setWalletProvider] = useState<any>(null);

    useEffect(() => {
        const checkWallets = () => {
            if ('solana' in window) {
                const provider = (window as any).solana;
                console.log('Solana provider found:', provider);
                if (provider.isPhantom) {
                    console.log('Phantom Wallet detected');
                    setWalletProvider(provider);
                    provider.connect({ onlyIfTrusted: true })
                        .then((response: any) => {
                            console.log('Connected:', response);
                            setPublicKey(new PublicKey(response.publicKey.toString()));
                        })
                        .catch((err: any) => {
                            console.error('Failed to connect:', err);
                        });
                }
            } else {
                const solflare = new Solflare();
                if (solflare.isConnected) {
                    console.log('Solflare Wallet detected');
                    setWalletProvider(solflare);
                    solflare.connect()
                        .then(() => {
                            if (solflare.publicKey) {
                                setPublicKey(new PublicKey(solflare.publicKey.toString()));
                            } else {
                                console.error('Solflare publicKey is null');
                            }
                        })
                        .catch((err: any) => {
                            console.error('Failed to connect:', err);
                        });
                } else {
                    console.warn('Solana provider not found. Please install Phantom or Solflare Wallet.');
                    window.open('https://phantom.app/', '_blank');
                    window.open('https://solflare.com/', '_blank');
                }
            }
        };

        checkWallets();
    }, []);

    const connectWallet = async () => {
        if (walletProvider) {
            try {
                const response = await walletProvider.connect();
                console.log('Connected:', response);
                setPublicKey(new PublicKey(walletProvider.publicKey.toString()));
                fetchBalance(new PublicKey(walletProvider.publicKey.toString()));
            } catch (err) {
                console.error('Failed to connect:', err);
            }
        } else {
            console.warn('Solana provider not found. Please install Phantom or Solflare Wallet.');
            window.open('https://phantom.app/', '_blank');
            window.open('https://solflare.com/', '_blank');
        }
    };

    const fetchBalance = async (publicKey: PublicKey) => {
        const connection = new Connection('https://api.devnet.solana.com');
        const balance = await connection.getBalance(publicKey);
        console.log('Balance:', balance);
        setBalance(balance / 1e9); // Convert lamports to SOL
    };

    useEffect(() => {
        if (publicKey) {
            fetchBalance(publicKey);
        }
    }, [publicKey]);

    return (
        <div>
            <h1>Solana Wallet Connection</h1>
            {publicKey ? (
                <div>
                    <p>Connected as: {publicKey.toBase58()}</p>
                    <p>Balance: {balance} SOL</p>
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default SolanaWallet;
