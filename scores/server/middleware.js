/**
 * @overview Middleware adder
 */
const compression = require("compression");
const express = require("express");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const minify = require("express-minify");
const minifyHTML = require("express-minify-html");
const morgan = require("morgan");
const path = require("path");
const webpack = require("webpack");
const constants = require("../utils/constants");
const webpackConfig = require("../webpack.config.dev");

/**
 * Function to add middleware to express server
 * @param {Object} app Express app object
 */
module.exports = (app) => {
  // View engine
  app.set("viewengine", "ejs");
  app.set("views", path.join(__dirname, "..", "public"));
  app.use("/modules", express.static(path.join(__dirname, "..", "node_modules")));
  // middleware
  app.use(bodyParser.json());       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 
  app.use(morgan(constants.logLevel, constants.logOpions)); // Logger
  app.use(minify()); // Minify
  app.use(minifyHTML());
  //app.use(compression()); // Compess
  app.use(favicon(path.join(__dirname, "..", "favicon.jpg"))); // Favicon

  // Hot reload
  if (process.env.NODE_ENV !== "production") {
    const compiler = webpack(webpackConfig);
    app.use(require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));
    app.use(require("webpack-hot-middleware")(compiler));
  } else {
    app.use(express.static(path.join(__dirname, "..", "build")));
  }
};
