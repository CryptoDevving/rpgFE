import React, { useState } from 'react';
import './RedButton.css';

interface RedButtonProps {
    text: string;
    onClick: () => void;
    normalBg?: string;
    hoverBg?: string;
    clickBg?: string;
}

const RedButton: React.FC<RedButtonProps> = ({ text, onClick, normalBg, hoverBg, clickBg }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const getBackgroundImage = () => {
        if (isClicked) return clickBg;
        if (isHovered) return hoverBg;
        return normalBg;
    };

    return (
        <button
            className="red-button"
            onMouseDown={() => setIsClicked(true)}
            onMouseUp={() => {
                setIsClicked(false);
                onClick();
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsClicked(false);
            }}
            style={{
                backgroundImage: `url(${getBackgroundImage()})`,
                transition: 'background-image 0.4s ease',
                width: '320px',
                height: '50px',
                border: 'none',
                cursor: 'pointer',
            }}>
            <div className="redbutton-text">{text}</div>
        </button>
    );
};

RedButton.defaultProps = {
    normalBg: '/figmaExports/buttons/RedButtonNormal.png',
    hoverBg: '/figmaExports/buttons/RedButtonHover.png',
    clickBg: '/figmaExports/buttons/RedButtonPressed.png',
};

export default RedButton;
