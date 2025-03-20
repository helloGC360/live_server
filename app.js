
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');

// Set up the view engine and middlewares
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Create an HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = socketIo(server);

app.get('/admin',(req,res)=>{
res.render("admin");
});
app.get('/',(req,res)=>{
res.render("public");
});


var c=0;
let fdata;

io.on('connection', (socket) => {
console.log('A user connected:', socket.id);
c++;
socket.on("scdata",(data)=>{
console.log(data);
fdata={
gs:data.gs,
os:data.os
}
io.sockets.emit("newdata",fdata);
});
io.sockets.emit("newdata",fdata);
io.sockets.emit("cdata",c);

socket.on("disconnect",()=>{
console.log('A user disconnected:', socket.id);
c--;
io.sockets.emit("cdata",c);
});
});

server.listen(3000);
