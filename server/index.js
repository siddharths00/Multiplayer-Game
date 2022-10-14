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

// var options = {
//     key: fs.readFileSync('cert.key','utf-8'),
//     cert: fs.readFileSync('cert.crt','utf-8')
// };

const app = express();
const server = http.createServer(app);
const socketio= require('socket.io')

// const server = https.createServer(app);
// const socketio= require('socket.io')(https, {
//     cors: {
//         origin: "*"
//     }
// })

class Queue {
    constructor() {
      this.elements = {};
      this.head = 0;
      this.tail = 0;
    }
    enqueue(element) {
      this.elements[this.tail] = element;
      this.tail++;
    }
    dequeue() {
      const item = this.elements[this.head];
      delete this.elements[this.head];
      this.head++;
      return item;
    }
    peek() {
      return this.elements[this.head];
    }
    get length() {
      return this.tail - this.head;
    }
    get isEmpty() {
      return this.length === 0;
    }
  }
  let toBeSent = new Queue();  

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "localhost:3000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});


const io = socketio(server, {cors: {origin: "*"}});
// const io = new Server({ server });

app.use(cors({origin: "ws://localhost:3000"}));

// MAYBE WRITE * instead of the URL

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
        // console.log("\n\nsending\n\n");
        socket.broadcast.to(user.room).emit('sendingPoints', { opponent: data.myPoints});
        callback();
    });
    socket.on('sendCoordinates', (data, callback) => {
        const user = getUser(socket.id);
        // console.log("\n\nsending\n\n");
        let run=true;
        let a=0;
        let interval;
        if(data.delay!==0){
            console.log(user.name, user.room, data.delay);
            interval=setInterval(function () {
                a+=1;
                toBeSent.enqueue([data.x, data.y+2*a]);
                while (!toBeSent.isEmpty) {
                    // console.log(q.dequeue());
                    let m = toBeSent.dequeue();
                    console.log("SENDING STUFf, ",m);
                    socket.broadcast.to(user.room).emit('coordinates', { x: m[0], y:m[1]});
                  }
                
                // console.log(`send ${data.x} ${data.y+a}`);
            }, 200);
            
        }
        setTimeout(function() {
            run = false;
            if(data.delay!==0){
                clearInterval(interval);
            }
            if(typeof data.x!== "undefined") {
                // moveUser(socket.id, )
                
                socket.broadcast.to(user.room).emit('coordinates', { x: data.x, y:data.y});
            }
            if(typeof data.points!== "undefined")
            socket.broadcast.to(user.room).emit('coordinates', { points:data.points});
            if(typeof data.myPoints!== "undefined")
            socket.broadcast.to(user.room).emit('coordinates', { score:data.myPoints});
            callback();
          }, data.delay);
          
        //   while(run) {
        //     a+=1
        //     if(typeof data.x!== "undefined")
        //     socket.broadcast.to(user.room).emit('coordinates', { x: data.x+1, y:data.y});
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