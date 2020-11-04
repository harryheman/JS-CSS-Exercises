const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('hello')
})

const server = app.listen(8000, () => {
    const host = server.address().address
    const port = server.address().port
    console.log('Server listening at http://%s:%s', host, port)
})