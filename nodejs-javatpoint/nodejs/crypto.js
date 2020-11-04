const crypto = require("crypto");
const secret = "abcdef";
const hash = crypto
	.createHmac("sha256", secret)
	.update("welcome to javascript")
	.digest("hex");

console.log(hash);
