/**
 * @overview Constants for server
 */
const path = require("path");
const fs = require("fs");

const date = new Date();

module.exports = {
  port: 3030,
  logLevel: process.env.NODE_ENV === "production" ? "common" : "dev",
  logOpions: process.env.NODE_ENV === "production" ? { stream: fs.createWriteStream(
    path.join(
      process.cwd(),
      "logs",
      `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}-${date.getHours()}-${date.getSeconds()}`
    ),
    { flags: "a" }
  )} : {},
};
