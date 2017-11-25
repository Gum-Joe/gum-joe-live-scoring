/**
  * @overview Startup script for scoring system for Gum Joe Live
  */
const express = require("express");
const addMiddleware = require("./server/middleware");
const router = require("./routes");

// Constants
const constants = require("./utils/constants");

// Init app
const app = express();
addMiddleware(app);

// Init router
app.use("/", router);

/**
 * Start the server
 */
app.listen(constants.port, () => {
  console.log(`Server listening on port ${constants.port}`);
});
