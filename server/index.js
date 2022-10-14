const express = require('express');
const https = require('https');
const http = require('http');
const cors = require('cors');
const { Server } = require('ws');
var fs = require('fs');    


// const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');
const { addUser, removeUser, getUser, getUsersInRoom, getRandomInt, users } = require('../client/src/users');
// const router = require('./router');

const PORT = process.env.PORT || 5000;

var options = {
    key: fs.readFileSync('cert.key','utf-8'),
    cert: fs.readFileSync('cert.crt','utf-8')
};

const app = express();
const server = http.createServer(app);
const socketio= require('socket.io')

// const server = https.createServer(app);
// const socketio= require('socket.io')(https, {
//     cors: {
//         origin: "*"
//     }
// })
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "localhost:3000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});


const io = socketio(server, {cors: {origin: "*"}});
// const io = new Server({ server });

app.use(cors({origin: "s://localhost:3000"}));
// app.use
io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback) => { 

        const { error, user } = addUser({ id: socket.id, name, room});
        if(error) return callback(error);

        console.log(user.name, user.room, " joined");

        socket.join(user.room);
        
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
        socket.broadcast.to(user.room).emit('sendingPoints', { opponent: data.myPoints});
        callback();
    });
    socket.on('sendCoordinates', (data, callback) => {
        const user = getUser(socket.id);
        console.log("\n\nsending\n\n");
        let run=true;
        setTimeout(function() {
            run = false;
            if(typeof data.x!== "undefined")
            socket.broadcast.to(user.room).emit('coordinates', { x: data.x, y:data.y});
            if(typeof data.points!== "undefined")
            socket.broadcast.to(user.room).emit('coordinates', { points:data.points});
            if(typeof data.myPoints!== "undefined")
            socket.broadcast.to(user.room).emit('coordinates', { score:data.myPoints});
            callback();
          }, data.delay);
        //   let a=0;
        //   while(run) {
        //     a+=1
        //     if(typeof data.x!== "undefined")
        //     socket.broadcast.to(user.room).emit('coordinates', { x: data.x+a, y:data.y});
        //     if(typeof data.points!== "undefined")
        //     socket.broadcast.to(user.room).emit('coordinates', { points:data.points});
        //     if(typeof data.myPoints!== "undefined")
        //     socket.broadcast.to(user.room).emit('coordinates', { score:data.myPoints});
        //   }
    });

    socket.on('updatedFruits', ({fruits, room}, callback) => {
            console.log("someone ate a fruit")
            socket.broadcast.to(room).emit('fruits', { fruits });
        callback();
    });


    socket.on('disconnect', ()=>{
        const user = getUser(socket.id);
        removeUser(socket.id);
        if(user)
        {
            io.to(user.room).emit('totalPlayers', {players:getUsersInRoom(user.room), left:true, name:user.name });
            console.log("User ",user.name," has left!!");
        }
    });
});

server.listen(PORT, ()=>console.log(`Server has started on port ${PORT}`));