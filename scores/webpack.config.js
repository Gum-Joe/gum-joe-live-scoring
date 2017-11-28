/**
 * @overview Webpack config
 */
const { join } = require("path");
const webpack = require("webpack");

// Raw loaders
// For easier customization
const rawLoaders = {
  json: { test: /\.json$/, exclude: /node_modules/, loaders: [ "json-loader" ] },
  jsx: { test: /\.jsx$/, exclude: /node_modules/, loaders: [ "babel-loader" ] },
  js: { test: /\.js$/, exclude: /node_modules/, loaders: [ "babel-loader" ] },
  scss: { test: /\.scss$/, exclude: /node_modules/, loaders: ["style-loader", "css-loader", "sass-loader"] },
  css: { test: /\.css$/, loaders: ["style-loader", "css-loader"] },
  img: {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [
      "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
      "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
    ]
  },
  font: {
    test: /\.(ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loaders: [ "file-loader?hash=sha512&digest=hex&name=./fonts/[hash].[ext]" ]
  },
  font2: {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "url-loader?limit=50000&mimetype=application/font-woff&name=./fonts/[hash].[ext]"
  }
};

const loadersToArray = (rawLoaders) => {
  const loaders = [];
  for (let file in rawLoaders) {
    if (rawLoaders.hasOwnProperty(file)) {
      loaders.push(rawLoaders[file]);
    }
  }
  return loaders;
};

const config = {
  context: __dirname,
  // Entry file
  entry: [
    "babel-polyfill",
    "webpack-hot-middleware/client",
    "react-hot-loader/patch",
    "./client/index.jsx"
  ],
  // Resolve
  resolve: {
    extensions: [" ", ".js", ".jsx", ".json", ".scss"]
  },
  devtool: "source-map",
  // Output dir
  output: {
    path: join(__dirname, "build", "js"),
    filename: "bundle.js",
    publicPath: "/js",
  },
  // Default loaders
  module: {
    rules: loadersToArray(rawLoaders)
  },
  // Plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
