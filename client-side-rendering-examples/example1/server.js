const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'))
app.use(express.static('public'))

app.get('*', (_, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

app.listen(1234, () => console.log('App is listening on port 1234'))
