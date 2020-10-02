const { BufferListStream } = require("bl");
const http = require("http");

const urlArr = process.argv.slice(2);
const dataArr = [];

for (const url of urlArr) {
  http
    .get(url, (res) => {
      res.pipe(
        BufferListStream((er, data) => {
          if (er) {
            return console.log(err);
          }
          dataArr[urlArr.indexOf(url)] = data.toString();
          if (urlArr.indexOf(url) === urlArr.length - 1) {
            printResults(dataArr);
          }
        })
      );
      res.on("error", (er) => console.error);
    })
    .on("error", console.error);
}

const printResults = (results) => {
  for (const item of results) {
    console.log(item);
  }
};
