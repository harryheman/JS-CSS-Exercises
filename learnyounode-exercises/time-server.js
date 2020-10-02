const net = require("net");
const PORT = process.argv[2];

const server = net.createServer((socket) => {
  const data = new Date()
    .toLocaleString()
    .replace(/:\d{2}$/, "")
    .replace(",", "")
    .replace(/(\d{2}).(\d{2}).(\d{4})/, "$3-$2-$1");
  socket.end(`${data}\n`);
});

server.listen(PORT);
