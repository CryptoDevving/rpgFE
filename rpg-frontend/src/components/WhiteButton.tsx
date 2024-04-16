import React, { useState } from 'react';
import './WhiteButton.css';

interface WhiteButtonProps {
    onClick: () => void;
    text?: string;
    width?: string;
    height?: string;
}

const WhiteButton: React.FC<WhiteButtonProps> = ({ onClick,
                                                     text = "Default Text",  // Providing default values directly in the destructuring
                                                     width = "150px",
                                                     height = "36px" }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleMouseDown = () => {
        setIsClicked(true);
    };

    const handleMouseUp = () => {
        setTimeout(() => {
            setIsClicked(false);
        }, 500); onClick();
    };

    const backgroundImageUrl = isClicked
        ? '/figmaExports/buttons/WhitePressed.png'
        : '/figmaExports/buttons/WhiteDefault.png'; //Default

    return (
        <div className="white-button"
             onMouseDown={handleMouseDown}
             onMouseUp={handleMouseUp}
             onMouseLeave={handleMouseUp}
             style={{
                 backgroundImage: `url(${backgroundImageUrl})`,
                 transition: 'background-image 0.4s',
                 cursor: 'pointer',
                 width,
                 height,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center'
             }}>
            <p className="text-inside-button">{text}</p>
        </div>
    );
};

export default WhiteButton;
