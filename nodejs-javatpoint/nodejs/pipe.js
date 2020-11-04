const fs = require("fs");

const readStream = fs.createReadStream("text.txt");

const writeStream = fs.createWriteStream("text2.txt");

readStream.pipe(writeStream);

console.log("program ended");
