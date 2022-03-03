const express = require('express');
const axios = require('axios');
const path = require('path');
const PORT = 3001;

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

let messages = [];

io.on('connection', socket => {
    console.log(`Socket connected: ${socket.id}`);

    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {
        console.log(data);
        messages.push(data);
        console.log(messages);

        socket.broadcast.emit('receivedMessage', data);

        axios({
            method: "post",
            url: "http://localhost:3000/messages",
            data: {
                content: data.message,
                user_id: 1
            }
        });

    });

});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});