/**
 * @overview Scores admin entry components, originally from @Jamesneakz (Twitter) in HTML
 */

import React, { Component } from "react";
import { Button, FormControl, FormGroup, InputGroup, HelpBlock } from "react-bootstrap";
import ajax from "es-ajax";
import io from "socket.io-client";
import { increment, deincrement, set } from "../../action/score";
const socket = io();

const numberword = [
  "one",
  "two",
  "three",
  "four"
];

/**
 * Component housing admin dashboard of scoring system for editing Scores
 * @extends React.Component
 * @class ScoresAdmin
 */
export default class ScoresAdmin extends Component {
  constructor() {
    super();
    this.state = {
      valid: null
    }
  }
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
    return (
      <div className="gridcontainer">
        {
          this.props.scores.map(score =>
            <div className={numberword[score.id]}>
              <div className="name" id={`player${score.id}name`}>{score.name}</div>
              <div className="score" id={`player${score.id}score`}>{score.score}</div>
              <button className="minusone" onClick={() => this.props.dispatch(deincrement(score.id))} id={`player${score.id}minus1`}>-</button>
              <button className="plusone" onClick={() => this.props.dispatch(increment(score.id))} id={`player${score.id}plus1`}>+</button>
              <form>
                <FormGroup validationState={this.state.valid}>
                  <InputGroup>
                    <FormControl type="text" placeholder="Enter number here" id={`custom-input-${score.id}`} />
                    <FormControl.Feedback />
                    <InputGroup.Button>
                      <Button bsStyle="success" onClick={() => {
                        const val = parseInt(document.getElementById(`custom-input-${score.id}`).value);
                        // Check type
                        if (isNaN(val)) {
                          this.setState({
                            ...this.state,
                            valid: "error"
                          });
                        } else {
                          this.props.dispatch(set(score.id, document.getElementById(`custom-input-${score.id}`).value));
                          document.getElementById(`custom-input-${score.id}`).value = "";
                          this.setState({
                            ...this.state,
                            valid: null
                          });
                        }
                      }}>Submit</Button>
                    </InputGroup.Button>
                  </InputGroup>
                  <HelpBlock>Score must be a number</HelpBlock>
                </FormGroup>
              </form>
            </div>
          )
        }
      </div>
    );
  }
}
