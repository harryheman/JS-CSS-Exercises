const net = require("net");

const server = net
	.createServer((socket) => {
		socket.end("byebye\n");
	})

	.on("error", (er) => {
		console.error(er);
	});

server.listen(() => {
	address = server.address();
	console.log("opened server on %j", address);
});
