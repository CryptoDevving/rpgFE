import React, { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import RedButton from "./RedButton";
import './SolanaWallet.css';
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const SolanaWallet: React.FC = () => {
    const [walletProvider, setWalletProvider] = useState<string>("");
    const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
    const [balance, setBalance] = useState<number | null>(null);

    const wallet = useWallet();
    const navigate = useNavigate();

    const [isPhantomClicked, setIsPhantomClicked] = useState(false);
    const [isSolflareClicked, setIsSolflareClicked] = useState(false);

    const [nickname, setNickname] = useState(''); // State for managing nickname input
    const { setUser } = useUser();

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

    // INPUT COMPONENT ------------------------------------------------

    const [isFocused, setIsFocused] = useState(false);

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value); // Update nickname state on input change
    };
    const handleFocus = () => {
        if (!isFocused) {
            setIsFocused(true);
        }
    };

    const handleBlur = () => {
        if (isFocused) {
            setIsFocused(false);
        }
    };

    // ---------- PROFILE CREATION -----------

    const createProfile = async () => {
        if (publicKey) {
            const initialInventory = Array(24).fill(null).map((_, index) => ({
                itemId: 0,  // No Item
                quantity: 0,
                equipped: false,
                unlocked: index < 16
            }));

            const randomNickname = Math.random().toString(36).substring(2, 10); // Generate a random nickname

            try {
                const response = await axios.post('http://localhost:8080/profiles', {
                    profileNickname: randomNickname,
                    solanaAddress: publicKey.toString(),
                    profileClass: 1,
                    money: 100,
                    level: 0,
                    healthPoints: 100,
                    inventory: initialInventory
                });
                console.log(response.data);
                alert('Profile created successfully!');

                setUser(response.data);  // Set the user in context
                navigate('/class-select');  // Navigate to class select page
            } catch (error) {
                console.error('Failed to create profile:', error);
                alert('Error creating profile.');
            }
        } else {
            alert('Please connect a wallet first.');
        }
    };


    const login = async () => {
        if (!publicKey) {
            alert('Please connect your wallet first.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/profiles/login/${publicKey.toString()}`);
            if (response.data) {
                setUser(response.data);
                navigate('/profile');
            } else {
                alert('No account found with this wallet. Please create an account.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Failed to log in. Please try again.');
        }
    };


    const backgroundImageUrl = isFocused
        ? '/figmaExports/SelectedInput.png'
        : '/figmaExports/FieldClassic.png';  //Default

    const backgroundImageUrlPhantom = isPhantomClicked
        ? '/figmaExports/buttons/LoginPhantomPressed.png'
        : '/figmaExports/buttons/LoginPhantomButton.png';

    const backgroundImageUrlSolflare = isSolflareClicked
        ? '/figmaExports/buttons/LoginSolflarePressed.png'
        : '/figmaExports/buttons/LoginSolflareButton.png';

    return (
        <div>

            <div className="input-container">

                <label htmlFor="inputField">Nickname</label>
                <div
                    className="input-background"
                    style={{ backgroundImage: `url(${backgroundImageUrl})`, transition: '0.8s' }}
                >
                    <input
                        id="inputField"
                        type="text" value={nickname}
                        onChange={handleNicknameChange}
                        onFocus={() => {setNickname(nickname); handleFocus()}}
                        onBlur={() => {setNickname(nickname); handleBlur()}}
                    />

                </div>
            </div>

            {publicKey ? (
                <div>
                    <div className="connected-text">
                        Connected with {walletProvider.toUpperCase()} as: {publicKey.toBase58().slice(0, 5)}...{publicKey.toBase58().slice(-3)}
                    </div>
                    <div style={{
                        marginLeft:25,
                    }}>
                        <RedButton text="Disconnet Wallet" onClick={disconnectWallet} />

                    </div>
                </div>
            ) : (
                <div>
                    <div className="phantom-button"
                         onMouseDown={handleMouseDownPhantom}
                         onMouseUp={handleMouseUpPhantom}
                         onMouseLeave={() => setIsPhantomClicked(false)}
                         style={{
                             backgroundImage: `url(${backgroundImageUrlPhantom})`
                         }}>
                        <p className="text-inside-button">Connect Phantom Wallet</p>
                    </div>

                    <div className="solflare-button"
                         onMouseDown={handleMouseDownSolflare}
                         onMouseUp={handleMouseUpSolflare}
                         onMouseLeave={() => setIsSolflareClicked(false)}
                         style={{
                             backgroundImage: `url(${backgroundImageUrlSolflare})`
                         }}>
                        <p className="text-inside-button">Connect Solflare Wallet</p>
                    </div>
                </div>
            )}

            <div>
                <div className="create-account-button">
                    <RedButton text="Create Account" onClick={createProfile} />
                </div>

                {publicKey && (
                    <div className="login-button">
                        <RedButton text="Log In" onClick={login} />
                    </div>
                )}
            </div>

        </div>
    );
};

export default SolanaWallet;
