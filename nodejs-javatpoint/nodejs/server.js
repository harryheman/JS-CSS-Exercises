const http = require("http");
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("hello world\n");
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
