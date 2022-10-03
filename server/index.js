const express = require('express');
const http = require('http');
const cors = require('cors');


const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');
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

        console.log(name, room, " joined");
        // const user2 = getUser(socket.id);
        // console.log(user2.name, user2.room, " joined");

        // socket.emit('message', { user: 'admin', text:` ${user.name}, welcome to the room ${user.room}`});
        // socket.broadcast.to(user.room).emit('message', {user:'admin', text: ` ${user.name}, has joined! Say hi`});

        socket.join(user.room);

        // io.to(user.room).emit('roomData', {room: user.room, users:getUsersInRoom(user.room)});

        callback(); 
    });

    socket.on('sendCoordinates', ({a, b}, callback) => {
        const user = getUser(socket.id);
        console.log(user, a, b);
        if(user)
        {

            socket.broadcast.to(user.room).emit('coordinates', { user: user.name, x: a, y:b });
            // io.to(user.room).emit('roomData', { room: user.room, users:getUsersInRoom(user.room) });
        }
        callback();
    });

    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id);
        // if(user)
        // {
        //     io.to(user.room).emit('message', {user: 'admin', text:`${user.name} has left .`} )
        // }
        console.log("User ",user.name," has left!!");
    });
});

server.listen(PORT, ()=>console.log(`Server has started on port ${PORT}`));