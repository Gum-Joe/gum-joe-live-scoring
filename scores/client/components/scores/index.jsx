/**
 * @overview Scores entry components
 */

import React, { Component } from "react";
import { Col, Grid,  Row } from "react-bootstrap";
import ajax from "es-ajax";
import io from "socket.io-client";
const socket = io();

let lastBuzz = "";

export default class Scores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      last: ""
    };
  }
  componentDidMount() {
    ajax("/api/get/scores")
      .get()
      .then(res => {
        this.props.dispatch({
          type: "INJECT",
          scores: JSON.parse(res.response).scores
        });
      })
      .catch(err => {
        throw err;
      });
    setInterval(() => {
      ajax("/api/get/last")
        .get()
        .then(res => {
          console.log(JSON.parse(res.response).name);
          this.setState({
            ...this.state,
            last: JSON.parse(res.response).name
          });
        })
        .catch(err => {
          throw err;
        });
    }, 250);
    // Socket.io
    socket.on("update-scores", scores => this.props.dispatch({ type: "INJECT", scores: scores.scores }));
  }

  render() {
    return (
      <div className="scores-back">
        <Grid>
          <Row>
            {
              this.props.scores.map(
                score =>
                  <Col md={3} key={score.id}>
                    <p className="scores-name">
                      { score.name }
                    </p>
                    <p className={`scores-score scores-${score.id}`}>
                      { score.score }
                    </p>
                  </Col>
              )
            }
            {/*
            <Col md={3}>
              <p className="scores-name">
                K_SAM
              </p>
              <p className="scores-score scores-0">
                1000
              </p>
            </Col>
            <Col md={3}>
              <p className="scores-name">
                K_SAM
              </p>
              <p className="scores-score scores-1">
                1000
              </p>
            </Col>
            <Col md={3}>
              <p className="scores-name">
                K_SAM
              </p>
              <p className="scores-score scores-2">
                1000
              </p>
            </Col>
            <Col md={3}>
              <p className="scores-name">
                K_SAM
              </p>
              <p className="scores-score scores-3">
                1000
              </p>
            </Col> */}
          </Row>
          <Row>
            <h2>Last Buzz: {this.state.last}</h2>
          </Row>
        </Grid>
      </div>
    );
  }
}
