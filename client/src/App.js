import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import Join from './components/join/Join.js';
// import Chat from 'C:\\Users\\siddh\\Desktop\\Sisyphus\\Programming\\React\\real-time-chat\\client\\src\\components\\chat\\Chat.js';
import { useState } from 'react';
import io from 'socket.io-client';
// import { Link } from 'react-router-dom';
const endpoint = 'localhost:5000';
// import './join.css';
const App = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return (
        <> 
            <div className = "joinOuterContainer">
                <div className = "joinInnerContainer">
                    <h1 className="heading">Join</h1>
                    <div><input placeholder="Name" className = "joinInput" type="text" onChange={(event) => setName(event.target.value)}/></div>
                    <div><input placeholder="Room" className = "joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)}/></div>
                    {/* <Link onClick={(event) => (!name || !room)?event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}> */}
                        <button onClick={(event) => {
                            console.log("yolo", name, room)
                            let socket = io(endpoint,{
                                withCredentials: true,
                            });
                            setName(name);
                            setRoom(room);
                            socket.emit('join', { name, room}, () => {

                            });
                            return () => {
                                socket.emit('disconnect');
                                socket.off(); 
                            }
                        }} className="button mt-20" type="submit">Sign In</button>
                    {/* </Link> */}
                </div>
            </div>
        </>
    );
}
// export default Join;
// const App = ()=>{
//     return(
//         // <Router >
//         //     <Route path="/" exact component={Join} />
//         //     <Route path="/chat" exact component={Chat} />
//         // </Router>
        
//     );
// };
export default App;