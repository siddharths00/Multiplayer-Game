import React, { useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';
// import checkMousePosition from '../../controllers/Mouse';
import './chat.css';
import getCoordinates from '../../controllers/Socket'
import Move from '../move/Move';
// const { addUser, removeUser, getUser, getUsersInRoom } = require('../../../../server/users');
// import InfoBar from 'C:\\Users\\siddh\\Desktop\\Sisyphus\\Programming\\React\\real-time-chat\\client\\src\\components\\infoBar\\InfoBar.js';
// import Input from 'C:\\Users\\siddh\\Desktop\\Sisyphus\\Programming\\React\\real-time-chat\\client\\src\\components\\Input\\Input.js';
// import Messages from 'C:\\Users\\siddh\\Desktop\\Sisyphus\\Programming\\React\\real-time-chat\\client\\src\\components\\Messages\\Messages.js';
let socket;
// const styled = window.styled.default;
// const StyledBoard = styled.section' background-color: #F2C438; width: 16rem; height: 16rem; position:relative;'
// const Square = styled.div`
//   background-color: #593202;
//   width: 1rem;
//   height: 1rem;
//   left: ${({ x }) => x+'rem'};
//   top: ${({ y }) => y+'rem'};
//   position:absolute;
// `

const Game = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [data, setData] = useState([]);

    const endpoint = 'localhost:5000';
    const [searchParams] = useSearchParams();
    const pixelDistance=20;
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [x2, setX2] = useState(630)
    const [y2, setY2] = useState(1380)
  //   const createPlayer = (canvas) => {
  //     canvas.style.border= "1px solid"
  //     ctx.fillStyle = "cyan";
  //     ctx.fillRect(posX, posY, 20, 20);
  // }
  //   const clear = () => {
  //       ctx.clearRect(0, 0, canvas.height, canvas.width)
  //   }
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
        // console.log("########",users = io.sockets.adapter.rooms.get(room));
        // The above is the same as writing socket.emit('join', { name:name, room:room});

        // The below return statement is like componentDidUmmount.
        return () => {
            socket.emit('disconnect');
            socket.off(); 
        }
    }, [endpoint]);

    useEffect(
        () => {
          // const canvas = document.querySelector('canvas');
          // canvas.innerHTML("YOLO");
        // const ctx = canvas.getContext('2d');
        // setX(5);
        // setY(5);
        // ctx.fillStyle = "cyan";
        // ctx.fillRect(x, y, 20, 20);
          const update = (e) => {
            // console.log(e);
            // setX(2);
            // setY(2);
            // console.log(e.screenX, e.screenY);
            // let a = e.screenX;
            // let b = e.screenY;
            
            const left = 37, up = 38, right = 39, down = 40

            let a=x;
            let b=y;
            if (e.keyCode == up){
              setX((top) => (top - pixelDistance >= 0 ? top - pixelDistance : 0));
              a=(x - pixelDistance >= 0 ? x - pixelDistance : 0);
            }
            else if (e.keyCode == down){
              setX((top) => top + pixelDistance <= 280 ? top + pixelDistance : 280);
              a=x + pixelDistance <= 280 ? x + pixelDistance : 280
            }
            else if (e.keyCode == left){
              setY((left) => left - pixelDistance >= 0 ? left - pixelDistance : 0);
              b=y - pixelDistance >= 0 ? y - pixelDistance : 0
            }
            else if (e.keyCode == right){
              setY((left) => left + pixelDistance <= 280 ? left + pixelDistance : 280);
              b=y + pixelDistance <= 280 ? y + pixelDistance : 280
            }
            else return;
            socket.emit('sendCoordinates', { x, y}, () => {

            });
            console.log(x, y);
            
          }
          // window.addEventListener('mousemove', update)
          window.addEventListener('keydown', update)
          
          return () => {
            // window.removeEventListener('mousemove', update)
            window.removeEventListener('keydown', update)
          }
          
        },
        [x, y]
      );
    
      useEffect(() => {
        socket.on('coordinates', (data) => {
            setData(data);
            setX2(data.x);
            setY2(data.y);
        })
    },[data]);

    return (<>
                  <Move top={x} left={y} top2={x2} left2={y2} />
        </>
    );
}
export default Game;