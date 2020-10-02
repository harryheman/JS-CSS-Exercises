const myModule = require("./my-module");

const dir = process.argv[2];
const ext = process.argv[3];

const cb = (err, data) => {
  if (err) return console.log(err);
  for (const item of data) {
    console.log(item);
  }
};

myModule(dir, ext, cb);
