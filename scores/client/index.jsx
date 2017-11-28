/**
 * @overview Index of react
 */
import "bootstrap/dist/js/bootstrap.min";
import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import ReactDom from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./components/router";

const render = Component => {
  ReactDom.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("root")
  );
};

// Start
render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./components/router.jsx", () => {
    render(require("./components/router").default);
  });
}
