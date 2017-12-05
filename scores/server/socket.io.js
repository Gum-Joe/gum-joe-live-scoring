/**
 * @overview Socket.io handler
 */
const fs = require("fs");
const { join } = require("path");
const initSIO = require("socket.io");
const { promisify } = require("util");
const { SCORES } = require("../utils/constants");

const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);

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

    read(SCORES)
      .then(data => socket.emit("update-scores", JSON.parse(data)))
      .catch(err => {  throw err; });


    // Handle score update
    socket.on("add-one", (scores) => {
      // Read scores
      let oldScores = require(SCORES).scores;
      oldScores[scores.id].score++;
      oldScores = {
        scores: oldScores
      };
      socket.emit("update-scores", oldScores);

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
      let oldScores = require(SCORES).scores;
      oldScores[scores.id].score--;
      oldScores = {
        scores: oldScores
      };
      socket.emit("update-scores", oldScores);

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
      let oldScores = require(SCORES).scores;
      oldScores[scores.id].score = scores.score;
      oldScores = {
        scores: oldScores
      };

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
  });
}

module.exports = addSIO;
