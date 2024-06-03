import React, { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import RedButton from "./RedButton";
import './SolanaWallet.css';
import axios from "axios";

const SolanaWallet: React.FC = () => {
    const [walletProvider, setWalletProvider] = useState<string>("");
    const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const wallet = useWallet();

    const [isPhantomClicked, setIsPhantomClicked] = useState(false);
    const [isSolflareClicked, setIsSolflareClicked] = useState(false);

    const [nickname, setNickname] = useState(''); // State for managing nickname input

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

    const backgroundImageUrl = isFocused
        ? '/figmaExports/SelectedInput.png'
        : '/figmaExports/FieldClassic.png';  //Default

    // ---------- PROFILE CREATION -----------

    const createProfile = async () => {
        if (publicKey && nickname) {
            try {
                const response = await axios.post('http://localhost:8080/profiles', {
                    profileNickname: nickname,
                    solanaAddress: publicKey.toString(),
                    profileClass: 1,
                    money: 100,
                    level: 0,
                    healthPoints: 100,
                });
                console.log(response.data);
                alert('Profile created successfully!');
            } catch (error) {
                console.error('Failed to create profile:', error);
                alert('Error creating profile.');
            }
        } else {
            console.log(`Public Key: ${publicKey}, Nickname: ${nickname}`); // Log for debugging
            alert('Please connect a wallet and enter a nickname.');
        }
    };

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

            <div className="create-account-button">
            <RedButton text="Create Account" onClick={createProfile}
                       normalBg="/figmaExports/buttons/RedButtonNormal.png"
                       hoverBg="/figmaExports/buttons/RedButtonHover.png"
                       clickBg="/figmaExports/buttons/RedButtonPressed.png"
            />
            </div>

        </div>
    );
};

export default SolanaWallet;
