/**
  * @overview Startup script for scoring system for Gum Joe Live
  */
const express = require("express");
const addMiddleware = require("./server/middleware");
const addSIO = require("./server/socket.io");
const router = require("./routes");

// Constants
const constants = require("./utils/constants");

// Init app
const app = express();
const http = require("http").Server(app);
addMiddleware(app);
addSIO(http); // Socket.io

// Init router
app.use("/", router);

/**
 * Start the server
 */
http.listen(constants.port, () => {
  console.log(`[INFO] Server listening on port ${constants.port}`);
});
