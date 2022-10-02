import React from 'react';
import { BrowserRouter as Routes,BrowserRouter, Route, Switch } from 'react-router-dom';

import Join from './components/join/Join.js';
import Game from './components/game/Game.js'
const App = ()=>{
    return(
        <Routes >
            <Route path="/"><Join/></Route>
            <Route path="/game"><Game/></Route>
        </Routes>
    );
}; 
export default App;