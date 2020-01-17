require('dotenv').config();

const express = require('express');
const socket = require('socket.io');
const app = express();

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`Server listening on PORT:${port}`));

const io = socket(server);

io.on('connection', socket => {
    console.log('Made socket connection.', socket.id);

    socket.on('chat', data => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    })
});
