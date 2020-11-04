const express = require('express')
const app = express()

app.use(express.static(__dirname))

app.get('/index.html', (req, res) => {
    res.sendFile('index.html')
})

app.get('/get', (req, res) => {
    const response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    }
    console.log(response)
    res.json(response)
})

app.listen(8000, () => console.log('server ready'))