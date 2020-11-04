const express = require('express')
const multer = require('multer')

const app = express()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage }).single('myfile')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/upload', (req, res) => {
    upload(req, res, (er) => {
        if (er) res.end('error')

        res.end('file uploaded')
    })
})

app.listen(3000, () => console.log('server ready'))