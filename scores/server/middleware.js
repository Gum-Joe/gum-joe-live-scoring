/**
 * @overview Middleware adder
 */
const compression = require("compression");
const favicon = require("serve-favicon");
const minify = require("express-minify");
const minifyHTML = require("express-minify-html");
const morgan = require("morgan");
const path = require("path");
const constants = require("../utils/constants");

/**
 * Function to add middleware to express server
 * @param {Object} app Express app object
 */
module.exports = (app) => {
  app.use(morgan(constants.logLevel, constants.logOpions)); // Logger
  app.use(minify());
  app.use(minifyHTML());
  app.use(compression());
  app.use(favicon(path.join(process.cwd(), "favicon.jpg")));
};
