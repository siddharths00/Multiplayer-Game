import React, { useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';
import './chat.css';
import getCoordinates from '../../controllers/Socket'
import Move from '../move/Move';
const { addUser, removeUser, getUser, getUsersInRoom, users } = require('../../users');
let socket;

const Game = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [data, setData] = useState([]);
    const [onlyOne, setonlyOne] = useState(true);
    const [points, setPoints] = useState([]);
    const [myPoints, setmyPoints] = useState(0);
    const [hisPoints, sethisPoints] = useState(0);
    const [msg, setMsg] = useState('Let another player join');
    const endpoint = 'http://localhost:5000';
    const [searchParams] = useSearchParams();
    const pixelDistance=20;
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [x2, setX2] = useState(405)
    const [y2, setY2] = useState(880)
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
        socket.emit('getUsers', { room}, (val) => {
          // console.log("################# ",getUsersInRoom(room), users);
          // console.log(val, "YULUUUUUUUUUUUUUUUUU ", val.length, getUsersInRoom(room));
          if(val.length==1) {
            console.log("this is second")
            setonlyOne(false);
            setX(x2);
            setY(y2);
            setX2(0);
            setY2(0);
          }
          else{
            console.log("this is first");
          }
        });
        socket.emit('join', { name, room}, (val) => {
          // console.log("################# ",getUsersInRoom(room), users);
          console.log(val, "YULUUUUUUUUUUUUUUUUU ", val.length, getUsersInRoom(room));
          
          if(val.length==2) {
            socket.on('totalPlayers', (data) => {
              setPoints(data.points);
              console.log(data, "cheking ");
                // setData(data);
                // setX2(data.x);
                // setY2(data.y);
            })
          }
        });
        
        // console.log("########",users = io.sockets.adapter.rooms.get(room));
        // The above is the same as writing socket.emit('join', { name:name, room:room});

        // The below return statement is like componentDidUmmount.
        return () => {
            socket.emit('disconnect');
            socket.off(); 
        }
    }, [endpoint]);

    // useEffect(()=>{
    //   socket.emit('getUsers', { room}, (val) => {
    //     // console.log("################# ",getUsersInRoom(room), users);
    //     // console.log(val, "YULUUUUUUUUUUUUUUUUU ", val.length, getUsersInRoom(room));
    //     if(val.length==2) {
    //       setonlyOne(false);
    //     }
    //   });
    // })
    useEffect(()=>{
      socket.on(('leftMessage', (data) => {
        console.log(data);
        setonlyOne(true);
      }))
  },[onlyOne]);

    useEffect(() => {
      socket.on('totalPlayers', (data) => {
        if(data.players.length==2) {
          setonlyOne(false);
          setPoints(data.points);
          // console.log(data);
        }
        else {
          setonlyOne(true)
          if(data.left) {
            setMsg(`${data.name} left so you won`);
          }
        }
        console.log(data, "cheking ", data.players.length);
          // setData(data);
          // setX2(data.x);
          // setY2(data.y);
      });
  },[onlyOne]);

  let incrementPoints = (setState) => {
    setState((e)=>e+1);
  }
  useEffect(() => {
    socket.on('coordinates', (data) => {
      console.log("yes this happened");
      console.log("before ", x2, y2);
        setData(data);
        setX2(data.x);
        setY2(data.y);
        setPoints(data.points);
        sethisPoints(data.score);
        console.log("after ", x2, y2);
    })
},[data]);
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
              // a=(x - pixelDistance >= 0 ? x - pixelDistance : 0);
            }
            else if (e.keyCode == down){
              setX((top) => top + pixelDistance <= 405 ? top + pixelDistance : 405);
              // a=x + pixelDistance <= 610 ? x + pixelDistance : 610
            }
            else if (e.keyCode == left){
              setY((left) => left - pixelDistance >= 0 ? left - pixelDistance : 0);
              // b=y - pixelDistance >= 0 ? y - pixelDistance : 0
            }
            else if (e.keyCode == right){
              setY((left) => left + pixelDistance <= 880 ? left + pixelDistance : 880);
              console.log("yoyo ", x, y);
              // b=y + pixelDistance <= 1360 ? y + pixelDistance : 1360
            }
            else return;

            for(let i=0; i<9; i++) {
              let point=points[i];
              if(point[2]==false)continue;
              // console.log(point,"PPPPPPPPPPPPPPPPPPPPPPPPPPPP");
              let pointX = point[0];
              let pointY = point[1];
              // console.log(point);
              if(Math.abs(pointX-x)<=10 && Math.abs(pointY-y)<=10) {
                  let temp=points
                  temp[i][2]=false;
                  console.log(points);
                  setPoints(temp);
                  console.log(points);
                  // incrementPoints(setmyPoints);
                  setmyPoints((e)=>e+1);
                  console.log("YOLO");
                  // socket.emit('updatedFruits', { fruits:fruits, room:room }, ()=>{});
                  console.log("YOLO2");
              }
              // if(Math.abs(pointY-left)<=10) {
              //     point[2]=false;
              //     incrementPoints(setmyPoints);
              //     console.log("YOLO");
              // }
              // if(Math.abs(pointX-x2)<=10 && Math.abs(pointX-y2)<=10) {
              //     let temp=points
              //     temp[i][2]=false;
              //     console.log(points);
              //     setPoints(temp);
              //     console.log(points);
              //     incrementPoints(sethisPoints);
              //     console.log("YOLO");
              //     // socket.emit('sendCoordinates', { x, y}, () => {
              //     // socket.emit('updatedFruits', { fruits:fruits, room:room }, ()=>{});
              //     console.log("YOLO2");
              // }
  
              // io.to(room).emit('totalPlayers', {players:getUsersInRoom(user.room), points:points });
              // if(Math.abs(pointX-left2)<=10) {
              //     point[2]=false;
              //     incrementPoints(sethisPoints);
              //     console.log("YOLO");
              // }
          }
          console.log("sending ", x, y);
          socket.emit('sendCoordinates', { x, y, points, myPoints}, () => {
            console.log("sent it");
          });

            // console.log(x, y);
            
          }
          // window.addEventListener('mousemove', update)
          window.addEventListener('keydown', update)
          
          return () => {
            // window.removeEventListener('mousemove', update)
            window.removeEventListener('keydown', update)
          }
          
        },
        [x, y, points, myPoints]
      );

    // let points = [];
    // function getRandomInt(max) {
    //   return Math.floor(Math.random() * max);
    // }    
    // for(let i=0; i<9; i++){
    //   let a=getRandomInt(610);
    //   let b=getRandomInt(1360);
    //   points.append([a,b]);
    // }
    return (<>
    {/* {onlyOne ? <h1>Let another player join</h1> : <Move top={x} left={y} top2={x2} left2={y2} />} */}
    <Move top={x} left={y} top2={x2} left2={y2} onlyOne={onlyOne} points={points} room={room} socket={socket} myPoints={myPoints} hisPoints={hisPoints} msg={msg}/>
    {/* {onlyOne ? <h1>Let another player join</h1> : } */}
                  
        </>
    );
}
export default Game;