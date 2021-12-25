/**
 * @overview Routes index
 */
const fs = require("fs");
const { join } = require("path");
const robot = require("robotjs");
const { promisify } = require("util");
const router = require("express").Router();
const Datastore = require("nedb");
const { SCORES, AUDIO } = require("../utils/constants");

let last = {};
const read = promisify(fs.readFile);
const db = new Datastore();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.get("/edit", (req, res) => {
  res.render("index.ejs");
});

router.get("/submit", (req, res) => {
  res.render("index.ejs");
});

router.get("/scores", (req, res) => {
  res.render("index.ejs");
});

router.get("/edit-written", (req, res) => {
  res.render("index.ejs");
});

router.get("/show-written", (req, res) => {
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

router.get("/api/get/contestants", (req, res, next) => {
  read(SCORES)
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(JSON.parse(result).contestants));
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
  const records = require(SCORES);
  if (typeof records.contestants[req.params.contestant] === "undefined") {
    res.statusCode = 404;
    res.send("ERROR: Invalid Contestant");
  } else {
    last = records.contestants[req.params.contestant];
    robot.keyTap(records.contestants[req.params.contestant].hotkey);
    res.statusCode = 200;
    res.send("OK");
  }
});

// Send last scored
router.get("/api/get/last", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.send(JSON.stringify(last));
});

// Get ans of a contestant
router.get("/api/get/written/:contestant", (req, res, next) => {
  db.find({ id: parseInt(req.params.contestant) }, function (err, docs) {
    res.statusCode = 200;
    res.send(JSON.stringify(docs));
  });
});

// Handle R1 submit
router.post("/api/post/submit-ans", (req, res, next) => {
  // Store answer
  db.insert(req.body, function (err, newDoc) {
    if (err) {
      throw err;
    }
    res.statusCode = 200;
    res.send("OK");
  });
});
module.exports = router;
