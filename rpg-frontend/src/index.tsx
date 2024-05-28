import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { clusterApiUrl } from '@solana/web3.js';
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";

const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({
        network: WalletAdapterNetwork.Devnet // Correctly use the enum for network
    }),
];

const network = clusterApiUrl('devnet');

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <ConnectionProvider endpoint={network}>
            <WalletProvider wallets={wallets} autoConnect>
                <App />
            </WalletProvider>
        </ConnectionProvider>
    </React.StrictMode>
);
