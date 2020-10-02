const { BufferListStream } = require("bl");
const http = require("http");

http
  .get(process.argv[2], (res) => {
    res.pipe(
      BufferListStream((er, data) => {
        if (er) {
          return console.log(err);
        }
        const str = data.toString();
        console.log(str.length);
        console.log(str);
      })
    );
    res.on("error", (er) => console.error);
  })
  .on("error", console.error);
