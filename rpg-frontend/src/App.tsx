import React from 'react';
import AppRouter from './routes/AppRouter';
import InputComponent from "./InputComponent";
import { useEffect, useState } from 'react';


interface Size {
    width: number;
    height: number;
}

const App: React.FC = () => {

    const [windowSize, setWindowSize] = useState<Size>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            {windowSize.width < 1084 || windowSize.height < 768 ? (
                <div style={{ textAlign: 'center', padding: 50 }}>
                    <p style={{ color: 'red', fontSize: 20 }}>
                        Your screen size is too small, please resize for a better experience.
                    </p>
                    <img
                        width="200px"
                        height="200px"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Warning.svg/1200px-Warning.svg.png"
                        alt="Warning Icon"
                    />
                </div>
            ) : (
                <AppRouter />
            )}
        </div>
    );
}

export default App;
