const users = []

function addUser({ id, name, room }) {
  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  )

  if (!name || !room) return { error: 'Name and room are required' }

  if (existingUser) return { error: 'Name is already taken' }

  const user = { id, name, room }

  users.push(user)

  return { user }
}

function removeUser(id) {
  const index = users.findIndex((user) => user.id === id)

  if (index !== -1) return users.splice(index, 1)[0]
}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

export { addUser, removeUser, getUser, getUsersInRoom }
