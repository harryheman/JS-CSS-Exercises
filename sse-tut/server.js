const http = require('http')
const PORT = process.env.PORT || 3000
const axios = require('axios')

const getUserData = async () => {
    const response = await axios.get('https://randomuser.me/api')
    return response.data.results[0]
}

let i = 1

const sendUserData = (req, res) => {
    res.writeHead(200, {
        Connection: 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
    })

    const timer = setInterval(async () => {
        if (i > 10) {
            clearInterval(timer)
            console.log('10 users has been sent.')
            res.write('id: -1\ndata:\n\n')
            res.end()
            return
        }

        const data = await getUserData()

        res.write(`event: randomUser\nid: ${i}\nretry: 5000\ndata: ${JSON.stringify(data)}\n\n`)

        console.log('User data has been sent.')

        i++
    }, 2000)

    req.on('close', () => {
        clearInterval(timer)
        res.end()
        console.log('Client closed the connection.')
    })
}

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    if (req.url === '/getUsers') {
        sendUserData(req, res)
    } else {
        res.writeHead(404)
        res.end()
    }

}).listen(PORT, () => console.log('Server ready.'))