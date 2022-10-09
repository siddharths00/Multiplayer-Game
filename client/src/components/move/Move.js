// const Move = ({ top, left, top2, left2, onlyOne }) => {
import React from 'react';
import { useEffect, useState } from "react";
import io from 'socket.io-client';
const Move = ({ top, left, top2, left2, onlyOne, points, room, myPoints, hisPoints, msg }) => {
    let ht=<></>;
    const [fruits, setFruits] = useState([]);
    // const [myPoints, setmyPoints] = useState(0);
    // const [hisPoints, sethisPoints] = useState(0);
    const endpoint = 'http://localhost:5000';
    let incrementPoints = (setState) => {
        setState((e)=>e+1);
    }

    let socket 

    // useEffect(()=>{
    //     socket = io(endpoint);
    //     try {
    //          socket.on('fruits', (data) => {
    //             points = data.points
    //             // console.log(data, "cheking ");
    //               // setData(data);
    //               // setX2(data.x);
    //               // setY2(data.y);
    //             console.log("HSLOOOOOOOOOOOOOOOOOOOOOOO");
    //           })
    //     }
    //     catch(e) {

    //     }
    // },[points]);
    useEffect(()=>{
        // console.log(points, "heth there\n\n");
        socket = io(endpoint);
        setFruits(points);
        try {
             socket.on('fruits', (data) => {
                setFruits(data.fruits)
                // console.log(data, "cheking ");
                  // setData(data);
                  // setX2(data.x);
                  // setY2(data.y);
                console.log("HSLOOOOOOOOOOOOOOOOOOOOOOO");
              })
        }
        catch(e) {

        }
        // checkProximity();
        try {
            // socket.on('fruits', (data) => {
            //     points = data.points
            //     // console.log(data, "cheking ");
            //       // setData(data);
            //       // setX2(data.x);
            //       // setY2(data.y);
            //   })
        //     for(let i=0; i<9; i++) {
        //     let point=fruits[i];
        //     if(point[2]==false)continue;
        //     // console.log(point,"PPPPPPPPPPPPPPPPPPPPPPPPPPPP");
        //     let pointX = point[0];
        //     let pointY = point[1];
        //     // console.log(point);
        //     if(Math.abs(pointX-top)<=10 && Math.abs(pointY-left)<=10) {
        //         let temp=fruits
        //         temp[i][2]=false;
        //         setFruits(temp);
        //         incrementPoints(setmyPoints);
        //         console.log("YOLO");
        //         socket.emit('updatedFruits', { fruits:fruits, room:room }, ()=>{});
        //         console.log("YOLO2");
        //     }
        //     // if(Math.abs(pointY-left)<=10) {
        //     //     point[2]=false;
        //     //     incrementPoints(setmyPoints);
        //     //     console.log("YOLO");
        //     // }
        //     if(Math.abs(pointX-top2)<=10 && Math.abs(pointX-left2)<=10) {
        //         let temp=fruits
        //         temp[i][2]=false;
        //         setFruits(temp);
        //         incrementPoints(sethisPoints);
        //         console.log("YOLO");
        //         // socket.emit('sendCoordinates', { x, y}, () => {
        //         socket.emit('updatedFruits', { fruits:fruits, room:room }, ()=>{});
        //         console.log("YOLO2");
        //     }

        //     // io.to(room).emit('totalPlayers', {players:getUsersInRoom(user.room), points:points });
        //     // if(Math.abs(pointX-left2)<=10) {
        //     //     point[2]=false;
        //     //     incrementPoints(sethisPoints);
        //     //     console.log("YOLO");
        //     // }
        // }
    }
    catch(e) {

    }

    try {
        // socket.broadcast.to(room).emit('updatedFruits', { fruits:fruits, room:room });
        console.log("sent it");
    }
    catch(e) {

    }
    },[points, top, left, top2, left2, onlyOne, fruits]);    

    let func=(point, i)=>{
        if(point[2])
            return(
            <div key={i}>
                            <div
                                style={{ top: `${point[0]}px`, left: `${point[1]}px` }}
                                className="point"
                            ></div>
                        </div>
            );
        else
            return null;
    }
    return (
        <> 
        
        {onlyOne?<div className='msgContainer'><h1>{msg}</h1></div>:
        <div className='outerContainer'>
        <div className='leftPoint'><h1>{myPoints}</h1></div>
            <div className="move-container">
                <div
                style={{ top: `${top}px`, left: `${left}px` }}
                className="move-div1"
                ></div>
                <div>
                    {fruits.map((point, i) => func(point, i))}
                </div>
                <div
                style={{ top: `${top2}px`, left: `${left2}px` }}
                className="move-div2"
                ></div>                
            </div>
            <div className='rightPoint'><h1>{hisPoints}</h1></div>
            </div>
        }
        </>
    );
}
export default Move;