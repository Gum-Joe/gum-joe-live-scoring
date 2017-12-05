/**
 * @overview Scores admin entry components, originally from @Jamesneakz (Twitter) in HTML
 */

import React, { Component } from "react";
import ajax from "es-ajax";
import io from "socket.io-client";
import { increment, deincrement } from "../../action/score";
const socket = io();

const numberword = [
  "one",
  "two",
  "three",
  "four"
];

export default class ScoresAdmin extends Component {
  componentDidMount() {
    // Fetch scores
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
    // Socket.io
    //socket.on("update-scores", scores => this.props.dispatch({ type: "INJECT", scores: scores.scores }));
  }
  render() {
    console.log(this.props);
    return (
      <div className="gridcontainer">
        {
          this.props.scores.map(score =>
            <div className={numberword[score.id]}>
              <div className="name" id={`player${score.id}name`}>{score.name}</div>
              <nameinput></nameinput>
              <div className="score" id={`player${score.id}score`}>{score.score}</div>
              <button className="minusone" onClick={() => this.props.dispatch(deincrement(score.id))} id={`player${score.id}minus1`}>-</button>
              <button className="plusone" onClick={() => this.props.dispatch(increment(score.id))} id={`player${score.id}plus1`}>+</button>
            </div>
          )
        }
      </div>
    );
  }
}
