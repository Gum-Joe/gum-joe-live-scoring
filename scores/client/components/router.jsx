/**
 * @overview Contains root component
 */
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./home"
import Scores from "./scores";
import ScoresAdmin from "./admin";

// Styles
import "../scss/index.scss";

/**
 * Root Component
 * Contains routing
 * @extends React.Component
 * @class App
 */
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/scores" component={Scores} />
          <Route path="/setscores" component={ScoresAdmin} />
        </Switch>
      </BrowserRouter>
    );
  }
}
