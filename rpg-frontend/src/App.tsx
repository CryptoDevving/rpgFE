import React from 'react';
import Game from './Game';
import Fetcher from "./fetch";

const App: React.FC = () => {
    return (
        <div>
            <Fetcher/>
            <Game />
        </div>
    );
}

export default App;
