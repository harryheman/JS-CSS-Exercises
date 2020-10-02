const fs = require("fs");
const path = require("path");

module.exports = (dir, ext, cb) => {
  fs.readdir(dir, (err, list) => {
    if (err) {
      return cb(err);
    }

    list = list.filter((file) => path.extname(file) === `.${ext}`);

    return cb(null, list);
  });
};
