const events = require("events");
const eventEmitter = new events.EventEmitter();

const connectHandler = () => {
	console.log("connection succesful");

	eventEmitter.emit("data_received");
};

eventEmitter.on("connection", connectHandler);

eventEmitter.on("data_received", () => console.log("data received"));

eventEmitter.emit("connection");

console.log("program ended");
