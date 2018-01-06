/**
 * @overview Routes index
 */
const { Router } = require("express");
const fs = require("fs");
const robot = require("robotjs");
const { promisify } = require("util");
const router = new Router();
const { SCORES } = require("../utils/constants");

let last = ""
const read = promisify(fs.readFile);

router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.get("/edit", (req, res) => {
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

/**
 * Route to handle buzzers
 * make sure pi/switcher.ahk is running
 */
router.get("/api/get/buzz/:contestant", (req, res, next) => {
  const { scores } = require(SCORES);
  if (typeof scores[req.params.contestant] === "undefined") {
    res.statusCode = 404;
    res.send("ERROR: Invalid Contestant");
  } else {
    last = scores[req.params.contestant].name;
    robot.keyTap(scores[req.params.contestant].hotkey);
    res.statusCode = 200;
    res.send("OK");
  }
});

// Send last scored
router.get("/api/get/last", (req, res, next) => {
  res.statusCode = 200
  res.send(last)
})

module.exports = router;
