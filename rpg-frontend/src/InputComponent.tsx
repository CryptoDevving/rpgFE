import React, { useState } from 'react';
import './InputComponent.css';
import ImageButtons from "./components/ClassSelectComponent";

const InputComponent = () => {
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
        <div className="input-container">
            <label htmlFor="inputField">Nickname</label>
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
    );
};

export default InputComponent;
