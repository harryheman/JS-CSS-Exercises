import http from 'http'
import express from 'express'
import socketio from 'socket.io'
import cors from 'cors'

import { addUser, removeUser, getUser, getUsersInRoom } from './users'

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())
app.get('/', (_, res) => {
  res.send('Server is running')
})

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, cb) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return cb(error)

    socket.join(user.room)

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to room ${user.room}`
    })

    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} connected` })

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })

    cb()
  })

  socket.on('sendMessage', (message, cb) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('message', { name: user.name, text: message })

    cb()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} disconnected`
      })

      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      })
    }
  })
})

server.listen(process.env.PORT || 1234, () => {
  console.log('Server is running')
})
