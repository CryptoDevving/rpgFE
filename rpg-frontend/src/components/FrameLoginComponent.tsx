import React from "react";
import InputComponent from "../InputComponent";

const FrameLoginComponent = () => {

    const frameImage = '/figmaExports/FrameLogin.png';

return(
            <div className="frame-box" style={{ position: 'relative', width: '450px', height: 'auto', marginLeft: "20%", marginTop: "60px"}}>
                <img src={frameImage} alt="Login Frame" draggable="false" style={{ width: '100%', height: 'auto' }} />

                <h1 className="text-above">ACCOUNT REGISTRATION</h1>

                <div style={{
                    position: 'absolute',
                    top: "110px",
                    left: '53%',
                    transform: 'translateX(-50%)',
                    width: '90%'
                }}>
                    <InputComponent text="Nickname"/>
                    <InputComponent text="Email"/>
                    <InputComponent text="Password"/>

                </div>
            </div>
    );
};

export default FrameLoginComponent;
