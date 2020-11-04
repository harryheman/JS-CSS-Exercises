const fs = require("fs");
const zlib = require("zlib");

fs.createReadStream("text.txt.gz")
	.pipe(zlib.createGunzip())
	.pipe(fs.createWriteStream("text.txt"));
console.log("file decompressed");

// const unzip = zlib.createGunzip()
// const inp = fs.createReadStream('text.txt.gz')
// const out = fs.createWriteStream('text.txt')
// inp.pipe(unzip).pipe(out)
