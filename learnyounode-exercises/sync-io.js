// node sync-io.js './text.txt'
// cat text.txt | wc -l

const fs = require("fs");

const buf = fs.readFileSync(process.argv[2]);

const str = buf.toString();

const arr = str.split("\n");

const count = arr.length - 1;

console.log(count);
