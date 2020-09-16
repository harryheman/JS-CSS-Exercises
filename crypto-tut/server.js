const express = require('express')
const app = express()

const router = express.Router()

app.use(express.json({
    type: ['application/json', 'text/plain']
}))
app.use(router)
app.use(express.static('src'))

let data

router.post('/secure-api', (req, res) => {
    data = req.body

    console.log(data)

    res.end()
})

router.get('/secure-api', (req, res) => {
    res.json(data)
})

app.listen(3000, () => console.log('Server ready'))