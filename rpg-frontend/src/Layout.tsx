import React from 'react';
import './Layout.css';
import logo from "./imports/LogoShadowCompressed.png";

interface LayoutProps {
    children: React.ReactNode;
    showLogo: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showLogo }) => {
    return (
        <div className="layout">
            {showLogo && (
                <header className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </header>
            )}
            <main className="content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
