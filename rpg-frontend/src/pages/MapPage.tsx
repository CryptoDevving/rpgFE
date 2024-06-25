import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MapPage.css';

const MapPage: React.FC = () => {
    const navigate = useNavigate();
    const [hoveredHouse, setHoveredHouse] = useState<string | null>(null);

    const navigateTo = (path: string) => {
        navigate(path);
    };

    const handleMouseEnter = (house: string) => {
        setHoveredHouse(house);
    };

    const handleMouseLeave = () => {
        setHoveredHouse(null);
    };

    return (
        <div className="map-container">
            <div className="background-wrapper">
                <img src="../figmaExports/mapBackground.png" alt="Map Background" className="map-background" />
            </div>
            <div
                className="house-container"
                style={{ top: '36.5%', left: '50%' }}
                onClick={() => navigateTo('/profile')}
                onMouseEnter={() => handleMouseEnter('hero')}
                onMouseLeave={handleMouseLeave}
            >
                <p className="house-label">Profile</p>
                <img
                    src={hoveredHouse === 'hero' ? "../figmaExports/HeroGlow.png" : "../figmaExports/Hero.png"}
                    alt="Profile"
                    className={`house ${hoveredHouse === 'hero' ? 'hovered' : ''}`}
                />
            </div>
            <div
                className="house-container"
                style={{ top: '51%', left: '35%' }}
                onClick={() => navigateTo('/tavern')}
                onMouseEnter={() => handleMouseEnter('tavern')}
                onMouseLeave={handleMouseLeave}
            >
                <p className="house-label">Tavern</p>
                <img
                    src={hoveredHouse === 'tavern' ? "../figmaExports/TavernGlow.png" : "../figmaExports/Tavern.png"}
                    alt="Tavern"
                    className={`house ${hoveredHouse === 'tavern' ? 'hovered' : ''}`}
                />
            </div>
            <div
                className="house-container"
                style={{ top: '39%', left: '40%' }}
                onClick={() => navigateTo('/dungeon')}
                onMouseEnter={() => handleMouseEnter('dungeon')}
                onMouseLeave={handleMouseLeave}
            >
                <p className="house-label">Dungeon</p>
                <img
                    src={hoveredHouse === 'dungeon' ? "../figmaExports/DungeonGlow.png" : "../figmaExports/Dungeon.png"}
                    alt="Dungeon"
                    className={`house ${hoveredHouse === 'dungeon' ? 'hovered' : ''}`}
                />
            </div>
        </div>
    );
};

export default MapPage;
