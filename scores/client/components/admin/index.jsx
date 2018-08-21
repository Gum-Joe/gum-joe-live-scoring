/**
 * @overview Scores admin entry components, originally from @Jamesneakz (Twitter) in HTML
 */

import React, { Component } from "react";
import { Button, FormControl, FormGroup, InputGroup, HelpBlock, Row } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import ajax from "es-ajax";
import io from "socket.io-client";
import { increment, deincrement, set } from "../../action/score";
const socket = io();

const MUSIC_IP = "192.168.0.22:4040";
const numberword = [
  "one",
  "two",
  "three",
  "four"
];

let lastBuzz;
/**
 * Component housing admin dashboard of scoring system for editing Scores
 * @extends React.Component
 * @class ScoresAdmin
 */
export default class ScoresAdmin extends Component {
  constructor() {
    super();
    this.state = {
      valid: null,
      last: {},
    }
  }
  componentDidMount() {
    // Fetch scores
    /**ajax("/api/get/scores")
      .get()
      .then(res => {
        this.props.dispatch({
          type: "INJECT",
          scores: JSON.parse(res.response).scores
        });
      })
      .catch(err => {
        throw err;
      });*/
    setInterval(async () => {
      try {
        const { response } = await ajax("/api/get/last").get();
        console.log(JSON.parse(response));
        this.setState({
          ...this.state,
          last: JSON.parse(response)
        });
      } catch (err) {
        console.error(err);
        throw err;
      }
    }, 250);
    // Socket.io
    socket.on("update-scores", scores => this.props.dispatch({ type: "INJECT", scores: scores.scores }));
  }

  render() {
    return (
      <div>
        <div className="gridcontainer">
          {
            this.props.scores.map(score =>
              <div className={numberword[score.id]}>
                <div className="name" id={`player${score.id}name`}>{score.name}</div>
                <div className="score" id={`player${score.id}score`}>{score.score}</div>
                <button className="scorechange minusone" onClick={() => this.props.dispatch(deincrement(score.id))} id={`player${score.id}minus1`}>-</button>
                <button className="scorechange minus400" onClick={() => this.props.dispatch(set(score.id, parseInt(score.score) - 3))} id={`player${score.id}plus1`}>-3 (R2)</button>
                <button className="scorechange minus800" onClick={() => this.props.dispatch(set(score.id, parseInt(score.score) - 5))} id={`player${score.id}plus1`}>-5</button>
                <button className="scorechange minus900" onClick={() => this.props.dispatch(set(score.id, parseInt(score.score) - 6))} id={`player${score.id}plus1`}>-6 (R3)</button>
                <button className="scorechange plusone" onClick={() => this.props.dispatch(increment(score.id))} id={`player${score.id}plus1`}>+</button>
                <button className="scorechange plus400" onClick={() => this.props.dispatch(set(score.id, parseInt(score.score) + 3))} id={`player${score.id}plus1`}>+3 (R2)</button>
                <button className="scorechange plus800" onClick={() => this.props.dispatch(set(score.id, parseInt(score.score) + 5))} id={`player${score.id}plus1`}>+5</button>
                <button className="scorechange plus900" onClick={() => this.props.dispatch(set(score.id, parseInt(score.score) + 6))} id={`player${score.id}plus1`}>+6 (R2)</button>
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
        <div className="last-buzz">
          <h2>Last Buzz: {this.state.last.name}</h2>
          <div className="last-buttons">
            <button className="written-right" onClick={async () => {
              this.props.dispatch(increment(this.state.last.id));
              this.props.dispatch(increment(this.state.last.id));
              this.props.dispatch(increment(this.state.last.id));
              await ajax(`http://${MUSIC_IP}/api/get/right`).get();
            }}><FontAwesome name="check" /></button>
            <button className="written-wrong" onClick={async () => {
              this.props.dispatch(deincrement(this.state.last.id));
              await ajax(`http://${MUSIC_IP}/api/get/wrong`).get();
            }}><FontAwesome name="times" /></button>
          </div>
        </div>
      </div>
    );
  }
}
