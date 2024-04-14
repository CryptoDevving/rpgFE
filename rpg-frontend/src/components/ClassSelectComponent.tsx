import React from 'react';
import './ImageButtons.css';

interface ImageButtonsProps {
    onSelectClass: (className: string) => void;
}

const ImageButtons: React.FC<ImageButtonsProps> = ({ onSelectClass }) => {
    const classes = [
        { name: 'Warrior', img: '/figmaExports/ClassIcons/warrior.png' },
        { name: 'Mage', img: '/figmaExports/ClassIcons/mage.png' },
        { name: 'Archer', img: '/figmaExports/ClassIcons/archer.png' },
        { name: 'Healer', img: '/figmaExports/ClassIcons/healer.png' }
    ];

    return (
        <div className="image-container">
            {classes.map(classItem => (
                <img
                    key={classItem.name}
                    src={classItem.img}
                    alt={classItem.name}
                    className={`class-image ${classItem.name.toLowerCase()}`}
                    onClick={() => onSelectClass(classItem.name)}
                />
            ))}
        </div>
    );
};

export default ImageButtons;
