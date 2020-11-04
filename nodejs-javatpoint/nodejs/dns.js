const dns = require("dns");

dns.lookup("www.javatpoint.com", (er, addr, family) => {
	if (er) console.error(er);
	console.log(addr);
	console.log(family);
});

dns.lookupService("127.0.0.1", 22, (er, hostname, service) => {
	if (er) console.error(er);
	console.log(hostname, service);
});
