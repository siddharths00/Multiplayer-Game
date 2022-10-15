import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './join.css';
const endpoint = 'http://10.194.39.136:5000/';
// io.origins('*:*');
let socket=io(endpoint, {cors: {
    origin: "http://10.194.39.136:5000/",
    credentials: true
  },
    transports: ["websocket"], // use webSocket only
    rejectUnauthorized: false
  });
const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [msg, setMsg] = useState('');
    return (
        <> 
            <div className = "joinOuterContainer">
                <div className = "joinInnerContainer">
                    <h1 className="heading">Join</h1>
                    {true?<p className='error'>{msg}</p>:null}
                    <div><input placeholder="Name" className = "joinInput" type="text" onChange={(event) => {
                        setName(event.target.value);
                        setMsg('');
                        }}/></div>
                    <div><input placeholder="Room" className = "joinInput mt-20" type="text" onChange={(event) => {
                        setRoom(event.target.value);
                        setMsg('');
                        }}/></div>
                    <Link onClick={(event) => {             
                        event.preventDefault();
                        console.log("just checking");
                        // import("../../users").then(userMod => {
                        //     console.log(userMod.users);
                        //   });
                        socket.emit('getUsers', { room}, (val) => {
                            console.log(val);
                            if(val.length == 2) {
                                setMsg("2 People already in the room")
                            }
                            else if(val.length == 1 && val[0].name===name) {
                                // event.preventDefault();
                                setMsg(`There is already a player by that name. Choose another`);
                            }
                            else {
                                console.log("hellot ehre");
                                window.location.href = `/game?name=${name}&room=${room}`;
                            }
                        });
                    
                    }} to={`/game?name=${name}&room=${room}`}>
                        <button className="button mt-20" type="submit">Sign In</button>
                    </Link>
                </div>
            </div>
        </>
    );
}
export default Join;