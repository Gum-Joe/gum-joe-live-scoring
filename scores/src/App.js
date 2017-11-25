import React, { Component } from "react"; // eslint-disable-line
import { Link } from 'react-router'; // eslint-disable-line
import { Button } from "react-bootstrap"; // eslint-disable-line
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Gum Joe Live Score System</h1>
        <Link to="/scores"><Button bsStyle="success">Go to Scores</Button></Link>
        <Link to="/edit"><Button bsStyle="primary">Go to score editer</Button></Link>
      </div>
    );
  }
}

export default App;
