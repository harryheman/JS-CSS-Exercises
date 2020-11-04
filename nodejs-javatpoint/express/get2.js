const express = require('express')
const app = express()

app.use(express.static(__dirname))

app.get('/index.html', (_, res) => {
    res.sendFile('index.html')
})

app.get('/get', (req, res) => {
    res.send(
        `<p>First Name: ${req.query['first_name']}</p>
        <p>Last Name: ${req.query['last_name']}</p>`
    )
})

app.listen(8000, () => console.log('server ready'))