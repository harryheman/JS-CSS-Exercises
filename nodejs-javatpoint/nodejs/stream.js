const fs = require("fs");

let data = "";

const readStream = fs.createReadStream("text.txt");

readStream.setEncoding("utf8");

readStream.on("data", (chunk) => {
	data += chunk;
});
readStream.on("end", () => {
	console.log(data);
});
readStream.on("error", (er) => {
	console.error(er);
});

data = "some other text";

const writeStream = fs.createWriteStream("text.txt");

writeStream.write(data, "utf8");

writeStream.end();

writeStream.on("finish", () => console.log("write completed"));

writeStream.on("error", (er) => console.error(er));
