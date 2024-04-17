import React, {useState} from 'react';
import './ClassSelectComponent.css';

interface ImageButtonsProps {
    onSelectClass: (className: string) => void;
}

interface ClassItem {
    name: string;
    img: string;
    info: string;
}

const ImageButtons: React.FC<ImageButtonsProps> = ({ onSelectClass }) => {
    const [selectedClass, setSelectedClass] = useState<string>('');

    const classes: ClassItem[] = [
        { name: 'Warrior', img: '/figmaExports/classIcons/warrior.png', info: '+5 DMG | -2 SPD | +1 CRT | 0 MNA' },
        { name: 'Mage', img: '/figmaExports/classIcons/mage.png', info: '+3 DMG | +1 SPD | +2 CRT | +5 MNA' },
        { name: 'Archer', img: '/figmaExports/classIcons/archer.png', info: '+4 DMG | +3 SPD | +1 CRT | +1 MNA' },
        { name: 'Healer', img: '/figmaExports/classIcons/healer.png', info: '+2 DMG | +1 SPD | +3 CRT | +4 MNA' }
    ];

    const handleClick = (className: string) => {
        setSelectedClass(className);
        onSelectClass(className);
    };

    const selectedClassInfo = classes.find(classItem => classItem.name === selectedClass)?.info;

    return (
        <div className="image-container">
            <div className="class-information">
                <p>{selectedClass ? selectedClassInfo : "Select a class"}</p>
            </div>

            {classes.map(classItem => (
                <div key={classItem.name}
                     className={`class-container ${selectedClass === classItem.name ? 'selected' : ''}`}
                     onClick={() => handleClick(classItem.name)}>
                    <img src={classItem.img}
                         alt={classItem.name}
                         className={`class-image ${selectedClass === classItem.name ? 'highlight' : ''} ${classItem.name.toLowerCase()}`} />
                    <p className="class-name">{classItem.name}</p>
                </div>
            ))}
        </div>
    );
};

export default ImageButtons;