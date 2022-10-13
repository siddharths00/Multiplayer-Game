import React from 'react';
import { useEffect, useState } from "react";
import io from 'socket.io-client';

/**
 * This component is responsible to display the position and their movements
 * of the players and friuts on the screen
 * @param {number} top -top refers to x coordinate of player 1
 * @param {number} left - left refers to y coordinate of player 1
 * @param {number} top2 -top2 refers to x coordinate of player 1
 * @param {number} left2 - left2 refers to y coordinate of player 1
 * @param {number} onlyOne -onlyOne refers when only one player has joined
 * @param {Array} points - points refers to fruit object
 * @param {number} room -room refers to room number 
 * @param {number} myPoints - myPoints refers to points of player 1
 * @param {number} hisPoints - hisPoints refers to points of player 2
 * @param {number} msg - msg refers to message to be displayed
 */


const Move = ({ top, left, top2, left2, onlyOne, points, room, myPoints, hisPoints, msg }) => {
    let ht=<></>;
    const [fruits, setFruits] = useState([]);
    const endpoint = 'https://multiplayer-game-01.herokuapp.com/';
    let incrementPoints = (setState) => {
        setState((e)=>e+1);
    }

    let socket 

    useEffect(()=>{
        socket = io(endpoint);
        setFruits(points);
        try {
             socket.on('fruits', (data) => {
                setFruits(data.fruits)
                console.log("HSLOOOOOOOOOOOOOOOOOOOOOOO");
              })
        }
        catch(e) {

        }
        
    },[points, top, left, top2, left2, onlyOne, fruits]);    
    /**
     * This function display based on array
     * @param {Array<number>} point - The this is the point Array referring to fruit
     * @param {number} i - array to point index
     */
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