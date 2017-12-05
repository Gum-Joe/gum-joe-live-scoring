/**
 * @overview Home page
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default class Home extends Component {
  constructor(){
    super();
    this.state = {
      routed: false
    };
  }
  render() {
    return (
      <div className="home-wrapper">
        <h1 className="home-head">Where would you like to go?</h1>
        <div className="home-buttons">
          <Button bsStyle="success" bsSize="large"><Link to="/scores">Scores</Link></Button>
          <Button bsStyle="info" bsSize="large"><Link to="/edit">Scores Control</Link></Button>
        </div>
      </div>
    );
  }
}
