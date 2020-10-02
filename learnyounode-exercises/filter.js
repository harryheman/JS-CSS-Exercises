const fs = require("fs");
const path = require("path");

const dir = process.argv[2];
const ext = `.${process.argv[3]}`;

fs.readdir(dir, (err, list) => {
  if (err) {
    return console.log(err);
  }

  for (const item of list) {
    if (path.extname(item) === ext) {
      console.log(item);
    }
  }
});
