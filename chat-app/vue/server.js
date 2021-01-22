const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname))

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/index.html')
})

http.listen(3000, () => {
  console.log('Listening on port 3000')
})

io.on('connection', (socket) => {
  socket.emit('connections', io.of('/').sockets.size)

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })

  socket.on('chat-message', (data) => {
    socket.broadcast.emit('chat-message', data)
  })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data)
  })

  socket.on('stopTyping', () => {
    socket.broadcast.emit('stopTyping')
  })

  socket.on('joined', (data) => {
    socket.broadcast.emit('joined', data)
  })

  socket.on('leave', (data) => {
    socket.broadcast.emit('leave', data)
  })
})
