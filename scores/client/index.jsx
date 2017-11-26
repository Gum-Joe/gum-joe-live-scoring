/**
 * @overview Index of react
 */
import "bootstrap/dist/js/bootstrap.min";
import React, { Component } from "react";
import ReactDom from "react-dom";

class Scores extends Component {
  render() {
    return (
      <h1>MyComponent</h1>
    );
  }
}
ReactDom.render(<Scores />, document.getElementById("root"));
