const socket = io()
const vue = new Vue({
  el: '#app',

  data: {
    newMessage: null,
    messages: [],
    typing: false,
    username: null,
    ready: false,
    info: [],
    connections: 0
  },

  created() {
    window.onbeforeunload = () => {
      socket.emit('leave', this.username)
    }

    socket.on('chat-message', ({ message, user }) => {
      this.messages.push({
        message,
        type: 1,
        user
      })
    })

    socket.on('typing', (data) => {
      this.typing = data
    })

    socket.on('stopTyping', () => {
      this.typing = false
    })

    socket.on('joined', (data) => {
      this.info.push({
        username: data,
        type: 'joined'
      })

      const timer = setTimeout(() => {
        this.info = []
        clearTimeout(timer)
      }, 5000)
    })

    socket.on('leave', (data) => {
      this.info.push({
        username: data,
        type: 'left'
      })

      const timer = setTimeout(() => {
        this.info = []
        clearTimeout(timer)
      }, 5000)
    })

    socket.on('connections', (data) => {
      this.connections = data
    })
  },

  watch: {
    newMessage(value) {
      value ? socket.emit('typing', this.username) : socket.emit('stopTyping')
    }
  },

  methods: {
    send() {
      this.messages.push({
        message: this.newMessage,
        type: 0,
        user: 'me'
      })

      socket.emit('chat-message', {
        message: this.newMessage,
        user: this.username
      })

      this.newMessage = null
    },

    addUser() {
      this.ready = true
      socket.emit('joined', this.username)
    }
  }
})
