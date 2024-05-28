import React from "react";
import FrameLoginComponent from "../components/FrameLoginComponent";
import SolanaWallet from "../components/SolanaWallet";


const LoginPage = () => {

    return(
        <div>
            <FrameLoginComponent></FrameLoginComponent>
            <SolanaWallet/>
        </div>
    );
};

export default LoginPage;
