import React from 'react';
import './Layout.css';
import logo from "./imports/LogoShadowCompressed.png";

// @ts-ignore
const Layout = ({ children, showLogo }) => {
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
