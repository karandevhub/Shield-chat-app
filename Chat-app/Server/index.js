const http = require('http');
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();

app.use(cors());
const port = 4000 || process.env.PORT;
const server = http.createServer(app);

const io = socketIO(server)

app.get('/', (req, res) =>{
    res.send("hello world!");
})


io.on('connection',(socket)=>{
    console.log(`a user connected to ${socket.id}`);
})




server.listen(port,() => {console.log(`server listening on ${port}`);}); 