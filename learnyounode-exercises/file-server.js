const http = require("http");
const fs = require("fs");

const PORT = process.argv[2];
const file = process.argv[3];

const server = http.createServer((_, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  const stream = fs.createReadStream(file);
  stream.on("open", () => {
    stream.pipe(res);
  });
  stream.on("error", (er) => res.end(er));
});

server.listen(PORT);
