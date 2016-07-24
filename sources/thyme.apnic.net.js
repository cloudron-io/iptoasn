"use strict";

const http = require("http");
const replace = require("replacestream");
const fs = require("fs");

const bgpTableUrl = "http://thyme.apnic.net/current/data-raw-table";

module.exports = (dst, callback) => {
  http.get(bgpTableUrl, (response) => {
    response.pipe(replace(/\t+/g, " "))
        .pipe(writeStream)
        .on("end", () => {
          writeStream.close();
          callback('finished');
        });
  });
};
