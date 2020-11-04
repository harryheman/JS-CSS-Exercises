const fs = require("fs");
const zlib = require("zlib");

fs.createReadStream("text.txt")
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream("text.txt.gz"));
console.log("file compressed");

// const gzip = zlib.createGzip()
// const inp = fs.createReadStream('text.txt')
// const out = fs.createWriteStream('text.txt.gz')
// inp.pipe(gzip).pipe(out)
