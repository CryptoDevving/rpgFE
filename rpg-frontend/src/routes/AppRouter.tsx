import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from "../Game";
import ClassSelectPage from "../pages/ClassSelectPage";
import LoginPage from "../pages/LoginPage";
import UserProfilePage from "../pages/UserProfilePage";
import DungeonPage from "../pages/DungeonPage";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/ceva" element={<Game />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/class" element={<ClassSelectPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dungeon" element={<DungeonPage />} />

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
