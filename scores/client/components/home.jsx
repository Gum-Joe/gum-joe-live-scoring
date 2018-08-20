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
          <Link to="/scores"><Button bsStyle="success" bsSize="large">Scores</Button></Link>
          <Link to="/submit"><Button bsStyle="primary" bsSize="large">R1 submission</Button></Link>
          <Link to="/edit"><Button bsStyle="info" bsSize="large">Scores Control</Button></Link>
          <Link to="/edit-written"><Button bsStyle="warning" bsSize="large">Written Scores Control</Button></Link>
          <Link to="/show-written"><Button bsStyle="danger" bsSize="large">Show Written Scores</Button></Link>
        </div>
      </div>
    );
  }
}
