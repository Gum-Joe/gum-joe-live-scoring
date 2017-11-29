/**
 * @overview Contains root component
 */
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./home";
import Scores from "../containers/scores";
import ScoresAdmin from "./admin";
import store from "../reducers";

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
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/scores" component={Scores} />
            <Route path="/setscores" component={ScoresAdmin} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
