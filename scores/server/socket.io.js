/**
 * @overview Socket.io handler
 */
const fs = require("fs");
const { join } = require("path");
const initSIO = require("socket.io");
const { promisify } = require("util");
const Datastore = require("nedb");
const { SCORES } = require("../utils/constants");

const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);
const db = new Datastore();

fs.open(SCORES, "a+", (err) => {
  if (err) {
    throw err;
  } else {
    console.log("[DEBUG:FILE] Created scores file");
  }
});

function addSIO(server) {
  const io = initSIO(server);
  console.log("[INFO] Socket.io Initialised");

  io.on("connection", (socket) => {
    console.log("[SOCKET] A user connected");

    // Boot INIT
    read(SCORES)
      .then(data => socket.emit("update-scores", JSON.parse(data)))
      .catch(err => {  throw err; });


    // Handle score update
    socket.on("add-one", (scores) => {
      // Read scores
      let oldScores = require(SCORES);
      oldScores.scores[scores.id].score++;
      io.emit("update-scores", oldScores);

      // Rewrite
      write(
        SCORES,
        JSON.stringify(
          oldScores,
          null,
          " "
        )
      )
        .catch(err => { throw err; });

    });

    socket.on("subtract-one", (scores) => {
      // Read scores
      let oldScores = require(SCORES);
      oldScores.scores[scores.id].score--;
      io.emit("update-scores", oldScores);

      // Rewrite
      write(
        SCORES,
        JSON.stringify(
          oldScores,
          null,
          " "
        )
      )
        .catch(err => { throw err; });

    });

    socket.on("change-score", (scores) => {
      // Read scores
      let oldScores = require(SCORES);
      oldScores.scores[scores.id].score = parseInt(scores.score);
      io.emit("update-scores", oldScores);

      // Rewrite
      write(
        SCORES,
        JSON.stringify(
          oldScores,
          null,
          " "
        )
      )
        .catch(err => { throw err; });

    });

    socket.on("add-custom", (scores) => {
      // Read scores
      let oldScores = require(SCORES);
      oldScores.scores[scores.id].score += parseInt(scores.value);
      io.emit("update-scores", oldScores);

      // Rewrite
      write(
        SCORES,
        JSON.stringify(
          oldScores,
          null,
          " "
        )
      )
        .catch(err => { throw err; });

    });

    socket.on("add-written", (answer) => {
      io.emit("new-answer", answer);
      console.log(answer);
      db.insert(answer, function (err, newDoc) {
        if (err) {
          throw err;
        }
      });
    });

    socket.on("clear-written", () => io.emit("clear-written-server", {}))
  });
}

module.exports = addSIO;
