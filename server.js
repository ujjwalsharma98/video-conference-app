const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');


app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})


io.on('connection', socket => {
    socket.on('join-roon', (roomId, userId) => {
        console.log(">>>>>", roomId, userId)
    })
})


const PORT = process.env.port || 3000

server.listen(PORT, () => console.log(`app is listening to port ${PORT}`))