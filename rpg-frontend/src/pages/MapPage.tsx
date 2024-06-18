import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MapPage.css';

const MapPage: React.FC = () => {
    const navigate = useNavigate();

    const navigateTo = (path: string) => {
        navigate(path);
    };

    return (
        <div className="map-container">
            <div className="background-wrapper">
                <img src="../figmaExports/mapBackground.png" alt="Map Background" className="map-background" />
            </div>
            <div className="house-container" style={{ top: '36.5%', left: '50%' }} onClick={() => navigateTo('/profile')}>
                <img src="../figmaExports/Hero.png" alt="Profile" className="house" />
            </div>
            <div className="house-container" style={{ top: '51%', left: '35%' }} onClick={() => navigateTo('/tavern')}>
                <img src="../figmaExports/Tavern.png" alt="Tavern" className="house" />
            </div>
            <div className="house-container" style={{ top: '39%', left: '40%' }} onClick={() => navigateTo('/dungeon')}>
                <img src="../figmaExports/Dungeon.png" alt="Dungeon" className="house" />
            </div>
            {/* Add more houses as needed */}
        </div>
    );
};

export default MapPage;
