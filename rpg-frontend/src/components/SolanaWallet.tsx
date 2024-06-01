import React, { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import RedButton from "./RedButton";
import './SolanaWallet.css';

const SolanaWallet: React.FC = () => {
    const [walletProvider, setWalletProvider] = useState<string>("");
    const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const wallet = useWallet();

    const [isPhantomClicked, setIsPhantomClicked] = useState(false);
    const [isSolflareClicked, setIsSolflareClicked] = useState(false);

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

    const handleMouseDownPhantom = () => {
        setIsPhantomClicked(true);
    };

    const handleMouseUpPhantom = () => {
        setTimeout(() => {
            setIsPhantomClicked(false);
            connectWallet("phantom");
        }, 500);
    };

    const handleMouseDownSolflare = () => {
        setIsSolflareClicked(true);
    };

    const handleMouseUpSolflare = () => {
        setTimeout(() => {
            setIsSolflareClicked(false);
            connectWallet("solflare");
        }, 500);
    };

    const backgroundImageUrlPhantom = isPhantomClicked
        ? '/figmaExports/buttons/LoginPhantomPressed.png'
        : '/figmaExports/buttons/LoginPhantomButton.png';

    const backgroundImageUrlSolflare = isSolflareClicked
        ? '/figmaExports/buttons/LoginSolflarePressed.png'
        : '/figmaExports/buttons/LoginSolflareButton.png';

    return (
        <div>
            {publicKey ? (
                <div>
                    <div className="connected-text">
                        Connected with {walletProvider.toUpperCase()} as: {publicKey.toBase58().slice(0, 5)}...{publicKey.toBase58().slice(-3)}
                    </div>
                    <div style={{
                        marginLeft:25,
                    }}>
                    <RedButton
                        text="Disconnect Wallet" onClick={disconnectWallet}
                        normalBg="/figmaExports/buttons/RedButtonNormal.png"
                        hoverBg="/figmaExports/buttons/RedButtonHover.png"
                        clickBg="/figmaExports/buttons/RedButtonPressed.png"
                    />
                    </div>
                </div>
            ) : (
                <div>
                    <div className="phantom-button"
                         onMouseDown={handleMouseDownPhantom}
                         onMouseUp={handleMouseUpPhantom}
                         onMouseLeave={() => setIsPhantomClicked(false)}
                         style={{
                             backgroundImage: `url(${backgroundImageUrlPhantom})`,
                             transition: 'background-image 0.4s',
                             cursor: 'pointer',
                             width: '320px',
                             height: '50px',
                             backgroundSize: 'cover',
                             backgroundPosition: 'center',
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center',
                             marginLeft: 27,
                             marginBottom: 20,
                         }}>
                        <p className="text-inside-button">Connect Phantom Wallet</p>
                    </div>
                    <div className="solflare-button"
                         onMouseDown={handleMouseDownSolflare}
                         onMouseUp={handleMouseUpSolflare}
                         onMouseLeave={() => setIsSolflareClicked(false)}
                         style={{
                             backgroundImage: `url(${backgroundImageUrlSolflare})`,
                             transition: 'background-image 0.4s',
                             cursor: 'pointer',
                             width: '320px',
                             height: '50px',
                             backgroundSize: 'cover',
                             backgroundPosition: 'center',
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center',
                             marginLeft: 27,

                         }}>
                        <p className="text-inside-button">Connect Solflare Wallet</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SolanaWallet;
