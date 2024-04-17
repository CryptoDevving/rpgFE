import React, { useState } from 'react';
import './InputComponent.css';
import Layout from "./Layout";

interface InputComponentProps {
    // onClick: () => void;
    text?: string;
    // width?: string;
    // height?: string;
}

const InputComponent: React.FC<InputComponentProps> = ({  text = "Default Text"}) => {
    const [isFocused, setIsFocused] = useState(false);

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


    return (
        <Layout showLogo={false}>
        <div className="input-container">

            <label htmlFor="inputField">{text}</label>
            <div
                className="input-background"
                style={{ backgroundImage: `url(${backgroundImageUrl})`, transition: '0.8s' }}
            >
                <input
                    id="inputField"
                    type="text"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        </div>
        </Layout>
    );
};

export default InputComponent;
