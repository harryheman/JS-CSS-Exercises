const net = require("net");

const client = net.connect({ port: 52305 }, () => {
	console.log("connected to server");
	client.write("world");
});

client.on("data", (data) => {
	console.log(data.toString());
	client.end();
});

client.on("end", () => {
	console.log("disconnected from server");
});
