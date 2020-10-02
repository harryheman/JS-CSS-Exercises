const http = require("http");

http
  .get(process.argv[2], (res) => {
    res.setEncoding("utf-8");
    res.on("data", (data) => console.log);
    res.on("error", (er) => console.error);
  })
  .on("error", console.error);
