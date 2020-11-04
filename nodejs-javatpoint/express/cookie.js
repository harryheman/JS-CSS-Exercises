const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.get('/set_cookie', (req, res) => {
    res.cookie('key', 'value')
    res.cookie('Igor', '30')
    res.status(201).send('cookie is set')
})

app.get('/get_cookie', (req, res) => {
    res.status(200).send(req.cookies)
})

app.get('/', (req, res) => {
    res.send('welcome')
})

app.listen(8000, () => console.log('server ready'))