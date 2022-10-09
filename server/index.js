const express = require('express');
const http = require('http');
const cors = require('cors');


// const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');
const { addUser, removeUser, getUser, getUsersInRoom, getRandomInt, users } = require('../client/src/users');
// const router = require('./router');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const socketio= require('socket.io')
const io = socketio(server, {cors: {origin: "http://localhost:3000"}});

// app.use(router);
app.use(cors());
io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback) => { 

        const { error, user } = addUser({ id: socket.id, name, room});
        if(error) return callback(error);

        console.log(user.name, user.room, " joined");
        // console.log(user);
        // const user2 = getUser(socket.id);
        // console.log(user2.name, user2.room, " joined");

        // socket.emit('message', { user: 'admin', text:` ${user.name}, welcome to the room ${user.room}`});
        // socket.broadcast.to(user.room).emit('message', {user:'admin', text: ` ${user.name}, has joined! Say hi`});

        socket.join(user.room);

        // io.to(user.room).emit('roomData', {room: user.room, users:getUsersInRoom(user.room)});
        
        let points=[]
        if(getUsersInRoom(user.room).length==2) {
            
            for(let i=0; i<9; i++){
            let a=getRandomInt(410);
            let b=getRandomInt(760);
            points.push([a,b,true]);
            }
            io.to(user.room).emit('totalPlayers', {players:getUsersInRoom(user.room), points:points, left:false });
        }
        else {
            socket.broadcast.to(user.room).emit('totalPlayers', {players:getUsersInRoom(user.room), left:false });
        }
        callback(getUsersInRoom(room));
        // callback(); 
    });

    socket.on('getUsers', ({room}, callback) => {
        console.log("get users");
        callback(getUsersInRoom(room));
        // callback(); 
    });
    socket.on('getPoints', (data, callback) => {
        const user = getUser(socket.id);
        console.log("\n\nsending\n\n");
        // , points, myPoints
        // socket.broadcast.to(user.room).emit('coordinates', { x: x, y:y, points:points, score:myPoints });
        // if(typeof data.x!== "undefined")
        socket.broadcast.to(user.room).emit('sendingPoints', { opponent: data.myPoints});
        // if(typeof data.points!== "undefined")
        // socket.broadcast.to(user.room).emit('coordinates', { points:data.points});
        // if(typeof data.myPoints!== "undefined")
        // socket.broadcast.to(user.room).emit('coordinates', { score:data.myPoints});
        callback();
    });
    socket.on('sendCoordinates', (data, callback) => {
        const user = getUser(socket.id);
        console.log("\n\nsending\n\n");
        // , points, myPoints
        // socket.broadcast.to(user.room).emit('coordinates', { x: x, y:y, points:points, score:myPoints });
        if(typeof data.x!== "undefined")
        socket.broadcast.to(user.room).emit('coordinates', { x: data.x, y:data.y});
        if(typeof data.points!== "undefined")
        socket.broadcast.to(user.room).emit('coordinates', { points:data.points});
        if(typeof data.myPoints!== "undefined")
        socket.broadcast.to(user.room).emit('coordinates', { score:data.myPoints});
        callback();
    });

    socket.on('updatedFruits', ({fruits, room}, callback) => {
        // const user = getUser(socket.id);
        // console.log(user, a, b);
        // if(user)
        // {
            console.log("someone ate a fruit")
            socket.broadcast.to(room).emit('fruits', { fruits });
            // io.to(user.room).emit('roomData', { room: user.room, users:getUsersInRoom(user.room) });
        // }
        callback();
    });


    socket.on('disconnect', ()=>{
        // console.log(users,"\n===\n");
        const user = getUser(socket.id);
        removeUser(socket.id);
        // console.log(users);
        if(user)
        {
            io.to(user.room).emit('totalPlayers', {players:getUsersInRoom(user.room), left:true, name:user.name });
            console.log("User ",user.name," has left!!");
        }
        // console.log("User ",user.name," has left!!");
    });
});

server.listen(PORT, ()=>console.log(`Server has started on port ${PORT}`));