import React, { useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';
// import checkMousePosition from '../../controllers/Mouse';
import './chat.css';
import getCoordinates from '../../controllers/Socket'
// import InfoBar from 'C:\\Users\\siddh\\Desktop\\Sisyphus\\Programming\\React\\real-time-chat\\client\\src\\components\\infoBar\\InfoBar.js';
// import Input from 'C:\\Users\\siddh\\Desktop\\Sisyphus\\Programming\\React\\real-time-chat\\client\\src\\components\\Input\\Input.js';
// import Messages from 'C:\\Users\\siddh\\Desktop\\Sisyphus\\Programming\\React\\real-time-chat\\client\\src\\components\\Messages\\Messages.js';
let socket;

const Game = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [data, setData] = useState([]);

    const endpoint = 'http://localhost:5000';
    const [searchParams] = useSearchParams();
    
    const [x, setX] = useState()
    const [y, setY] = useState()

    useEffect(()=>{
        // The following code acts like componentDidMount and componentDidUpdate.
        // So this piece of code will run everytime the component is loaded or unloaded.
        
        socket = io(endpoint);
        const name = searchParams.get('name');
        const room = searchParams.get('room');
        console.log(name, room);
        setName(name);
        setRoom(room);
        console.log("===", name, room);
        socket.emit('join', { name, room}, () => {

        });
        // The above is the same as writing socket.emit('join', { name:name, room:room});

        // The below return statement is like componentDidUmmount.
        return () => {
            socket.emit('disconnect');
            socket.off(); 
        }
    }, [endpoint]);

    useEffect(
        () => {
          const update = (e) => {
            setX(e.screenX)
            setY(e.screenY)
            console.log(e.screenX, e.screenY);
            let a = e.screenX;
            let b = e.screenY;
            socket.emit('sendCoordinates', { a, b}, () => {

            });
          }
          window.addEventListener('mousemove', update)
          window.addEventListener('touchmove', update)
          
          return () => {
            window.removeEventListener('mousemove', update)
            window.removeEventListener('touchmove', update)
          }
          
        },
        [setX, setY]
      );
    
      useEffect(() => {
        socket.on('coordinates', (data) => {
            setData(data);
            console.log(name, room, data);
        })
    },[data]);

    return (
        <div className="outerContainer">
             <div className="container">
                {/* <InfoBar propRoom={room}/> */}
                {/* <Messages messages = {messages} name={name}/> */}
                {/* <Input message = {message} setMessage={setMessage} sendMessage={sendMessage} /> */}
            </div> 
        </div>
    );
}
export default Game;