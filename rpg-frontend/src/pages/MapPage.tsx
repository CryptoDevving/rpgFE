import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MapPage.css';
import Layout from "../Layout";

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
        <Layout showLogo={true}>
            <div className="map-container">
                <div className="background-wrapper">
                    <img src="../figmaExports/mapBackground.png" alt="Map Background" className="map-background" />
                </div>
                <div
                    className="house-container"
                    style={{ top: '42%', left: '52%' }}
                    onClick={() => navigateTo('/profile')}
                >
                    <div
                        className="house-inner"
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
                </div>
                <div
                    className="house-container"
                    style={{ top: '56.5%', left: '37.5%' }}
                    onClick={() => navigateTo('/tavern')}
                >
                    <div
                        className="house-inner"
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
                </div>
                <div
                    className="house-container"
                    style={{ top: '44%', left: '42%' }}
                    onClick={() => navigateTo('/dungeon')}
                >
                    <div
                        className="house-inner"
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
            </div>
        </Layout>
    );
};

export default MapPage;
