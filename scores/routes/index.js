/**
 * @overview Routes index
 */
const { Router } = require("express");
const fs = require("fs");
const { promisify } = require("util");
const router = new Router();
const { SCORES } = require("../utils/constants");

const read = promisify(fs.readFile);

router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.get("/api/get/scores", (req, res, next) => {
  read(SCORES)
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.send(result);
      next();
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
