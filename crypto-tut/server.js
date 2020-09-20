const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

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

app.listen(PORT, () => console.log('Server ready'))