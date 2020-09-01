const http = require('http')
const PORT = process.env.PORT || 5000

const catFacts = [
  'On average, cats spend 2/3 of every day sleeping.',
  'Unlike dogs, cats do not have a sweet tooth.',
  'When a cat chases its prey, it keeps its head level.',
  'The technical term for a cat\'s hairball is a bezoar.',
  'A group of cats is called a clowder.',
  'Cats make about 100 different sounds.',
  'There are over 500 million domestic cats globally.',
  'Cats are the most popular pet in North America.',
  'A cat\'s hearing is better than a dog\'s.',
  'Researchers are unsure exactly how a cat purrs.'
]

const memes = [
  'https://imgflip.com/s/meme/Creepy-Condescending-Wonka.jpg',
  'https://imgflip.com/s/meme/Doge.jpg',
  'https://imgflip.com/s/meme/Philosoraptor.jpg',
  'https://imgflip.com/s/meme/Conspiracy-Keanu.jpg',
  'https://imgflip.com/s/meme/Table-Flip-Guy.jpg'
]

const getRandomIndex = (low, high) => {
  const min = Math.ceil(low)
  const max = Math.floor(high)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

const createCatFactMessage = () => {
  console.log('Sending cat fact message.')
  return (`event: catFact\ndata:${catFacts[getRandomIndex(0, catFacts.length - 1)]}\n\n\n`)
}

const createCoinTossMessage = () => {
  console.log('Sending coin toss message.')
  return (`event: coinToss\ndata:${getRandomIndex(0, 1) ? 'Heads' : 'Tails'}\n\n\n`)
}

const createDieRollMessage = () => {
  console.log('Sending die roll message.')
  return (`event: dieRoll\ndata:${getRandomIndex(1, 6)}\n\n\n`)
}

const createMemeMessage = () => {
  console.log('Sending meme message.')
  return (`event: meme\ndata:${memes[getRandomIndex(0, memes.length - 1)]}\n\n\n`)
}

const createRandomEvents = (req, res) => {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  })

  let eventsSent = 1

  const interval = setInterval(() => {
    if (eventsSent === 31) {
      clearInterval(interval)
      console.log('Sent 30 events, stopping.')
      res.write('id: -1\ndata:\n\n\n')
      res.end()
      return
    }

    res.write(`id: ${eventsSent}\n`)

    const msgType = getRandomIndex(0, 3)

    switch (msgType) {
      case 0:
        res.write(createCoinTossMessage())
        eventsSent += 1
        break
      case 1:
        res.write(createDieRollMessage())
        eventsSent += 1
        break
      case 2:
        res.write(createCatFactMessage())
        eventsSent += 1
        break
      case 3:
        res.write(createMemeMessage())
        eventsSent += 1
        break
    }
  }, 3000)

  req.on('close', () => {
    clearInterval(interval)
    res.end()
    console.log('Stopped sending events as client closed the connection.')
  })
}

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', '*')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  switch (req.url) {
    case '/randomEvents':
      createRandomEvents(req, res)
      break;
    default:
      res.writeHead(404)
      res.end()
  }
}).listen(PORT, () => console.log(`server running on port ${PORT}`))
