const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(express.static(__dirname))

app.get('/', (_, res) => {
    res.sendFile('index2.html')
})

app.post('/post', (req, res) => {
    const response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }
    res.json(response)
})

app.listen(8000, () => console.log('server ready'))