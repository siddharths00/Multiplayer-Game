import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import Join from './components/join/Join.js';
// import Chat from 'C:\\Users\\siddh\\Desktop\\Sisyphus\\Programming\\React\\real-time-chat\\client\\src\\components\\chat\\Chat.js';
import { useState } from 'react';
import io from 'socket.io-client';
// import useMousePosition from '../../controllers/Mouse';
import { Link } from 'react-router-dom';
import './join.css';
const endpoint = 'http://localhost:5000';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return (
        <> 
            <div className = "joinOuterContainer">
                <div className = "joinInnerContainer">
                    <h1 className="heading">Join</h1>
                    <div><input placeholder="Name" className = "joinInput" type="text" onChange={(event) => setName(event.target.value)}/></div>
                    <div><input placeholder="Room" className = "joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)}/></div>
                    <Link onClick={(event) => (!name || !room)?event.preventDefault():null} to={`/game?name=${name}&room=${room}`}>
                        <button className="button mt-20" type="submit">Sign In</button>
                    </Link>
                </div>
            </div>
        </>
    );
}
export default Join;