// src/routes/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InputComponent from "../InputComponent";
import Game from "../Game";

const AppRouter: React.FC = () => {
    // const { isAuthenticated } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/ceva" element={<Game />} />
                <Route path="/test" element={<InputComponent />} />

                {/*<Route path="/" element={<Login />} />*/}
                {/*<Route path="/class-select" element={<ClassSelect />} />*/}
                {/*<Route path="/map" element={isAuthenticated ? <Map /> : <Navigate to="/" />} />*/}
                {/*<Route path="/hero" element={isAuthenticated ? <HeroPage /> : <Navigate to="/" />} />*/}
                {/*<Route path="/tavern" element={isAuthenticated ? <Tavern /> : <Navigate to="/" />} />*/}
                {/*<Route path="/dungeon" element={isAuthenticated ? <Dungeon /> : <Navigate to="/" />} />*/}
            </Routes>
        </Router>
    );
}

export default AppRouter;
