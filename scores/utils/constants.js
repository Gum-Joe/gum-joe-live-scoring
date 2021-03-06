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
      __dirname,
      "..",
      "logs",
      `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}-${date.getHours()}-${date.getSeconds()}`
    ),
    { flags: "a" }
  )} : {},
  SCORES: path.join(__dirname, "..", "data", "scores.json"),
  AUDIO: path.join(__dirname, "../../pi/SFX")
};
