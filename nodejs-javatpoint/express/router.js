const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log('GET request for home')
    res.send('welcome to home')
})

app.post('/', (req, res) => {
    console.log('POST request for home')
    res.send('I am impossible')
})

app.delete('/delete', (req, res) => {
    console.log('DELETE request')
    res.send('I am deleted')
})

app.get('/some', (req, res) => {
    console.log('GET request from some')
    res.send('I am some')
})

app.get('/ab*cd', (req, res) => {
    console.log('GET request for abcd')
    res.send('pattern matched')
})

app.listen(8000, () => console.log('server ready'))