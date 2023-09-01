const express = require('express');
const { Server } = require('socket.io');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
  })
const server = app.listen('3001', () => {
    console.log('Server running on port 3001....')
})
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
    socket.emit('welcome', 'Welcome to the chat room we')
    socket.on('join_room', (data) => {
        socket.join(data)
    })
    socket.on('send_message', (data) => {
        socket.to(data.room).emit("receive_message", data.content);
    })
    socket.on('disconnect', () => {
        console.log('server disconnected')
    })
})
module.exports = app;