const express = require('express')
const path = require('path')
const port = process.env.PORT || 1234
const app = express()

app.use(express.static(__dirname + '/src'))

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
