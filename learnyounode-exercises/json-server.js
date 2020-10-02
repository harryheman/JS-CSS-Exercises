const http = require("http");

const PORT = process.argv[2];

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://example.com");
  const time = new Date(url.searchParams.get("iso"));
  let result;

  if (req.url.startsWith("/api/parsetime")) {
    result = {
      hour: time.getHours(),
      minute: time.getMinutes(),
      second: time.getSeconds(),
    };
  } else if (req.url.startsWith("/api/unixtime")) {
    result = { unixtime: time.getTime() };
  }

  if (result) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT);
