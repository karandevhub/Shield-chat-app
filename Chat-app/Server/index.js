const http = require('http');
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();

const users=[{}]

app.use(cors());
const port = 4000 || process.env.PORT;
const server = http.createServer(app);

const io = socketIO(server)

app.get('/', (req, res) =>{
    res.send("hello world!");
})


io.on('connection',(socket)=>{
    console.log(`a user connected to ${socket.id}`);
   
    socket.on('joined',({user})=>{
        users[socket.id] = user
        console.log(`${user} is now connected`)
        socket.emit("welcome", {user:"Admin",message:`welcome to the chat,${users[socket.id]}`})
        socket.broadcast.emit("userjoined",{user:"Admin",message:`${users[socket.id]} has now joined`})
    
    })

    socket.on('disconnect',()=>{
        console.log(`${users[socket.id]} has disconnected`)
        socket.broadcast.emit("userleft",{user:"Admin",message:`${users[socket.id]} has left`})
        delete users[socket.id]
    })

})




server.listen(port,() => {console.log(`server listening on ${port}`);}); 