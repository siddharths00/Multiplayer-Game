import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import your route components too

import Join from './components/join/Join.js';
import Game from './components/game/Game.js';
import App from './App';
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Join />}/>
          <Route path="/game" element={<Game />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);