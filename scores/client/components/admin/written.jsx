/**
 * @overview Admin for written round
 */
import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import { Button } from "react-bootstrap";
import ajax from "es-ajax";
import io from "socket.io-client";
const socket = io();

const defaultState = () => {
  return {
    ans: {
      c0: ["", "", "", "", ""],
      c1: ["", "", "", "", ""],
      c2: ["", "", "", "", ""],
      c3: ["", "", "", "", ""],
      c4: ["", "", "", "", ""],
    },
    correct: {
      c0: [null, null, null, null, null],
	    c1: [null, null, null, null, null],
      c2: [null, null, null, null, null],
      c3: [null, null, null, null, null],
      c4: [null, null, null, null, null],
    },
    submited: {
      c0: [false, false, false, false, false,],
      c1: [false, false, false, false, false,],
      c2: [false, false, false, false, false,],
      c3: [false, false, false, false, false,],
      c4: [false, false, false, false, false,],
    }
  }
}

export class ShowWritten extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contestants: [],
      ...defaultState()
    } 
    this.rightHandle = this.rightHandle.bind(this);
    this.wrongHandle = this.wrongHandle.bind(this);
    this.check = this.check.bind(this);
    this.clear = this.clear.bind(this);
  }
  async componentDidMount() {
    try {
      socket.on("new-answer", answer => {
        if (!this.state.submited[`c${answer.id}`][answer.qid - 1]) {
          // Handle answer
          const newState = {
            ...this.state,
          };
          if (answer.ans === "") {
            newState.ans[`c${answer.id}`][answer.qid - 1] = "<BLANK>";
          } else {
            newState.ans[`c${answer.id}`][answer.qid - 1] = answer.ans;
          }
          newState.submited[`c${answer.id}`][answer.qid - 1] = true;
          this.setState(newState);
        }
      });

      socket.on("clear-written-server", () => {
        this.setState({
          contestants: this.state.contestants,
          ...defaultState()
        });
      })

      socket.on("change-written-live-fserver", answer => {
        if (!this.state.submited[`c${answer.id}`][answer.qid - 1]) {
          const newState = {
            ...this.state,
          };
          newState.ans[`c${answer.id}`][answer.qid - 1] = answer.ans;
          this.setState(newState);
        }
      });

      socket.on("mark-correct-server", ans => {
        if (this.state.correct[`c${ans.id}`][ans.qid] === null) {
          const newState = {
            ...this.state
          }
          newState.ans[`c${ans.id}`][ans.qid] += " ✔️";
          newState.correct[`c${ans.id}`][ans.qid] = false;
          this.setState(newState);
        }
      });

      socket.on("mark-wrong-server", ans => {
        if (this.state.correct[`c${ans.id}`][ans.qid] === null) {
          const newState = {
            ...this.state
          }
          newState.ans[`c${ans.id}`][ans.qid] += " ❌";
          newState.correct[`c${ans.id}`][ans.qid] = false;
          this.setState(newState);
        }
      });

      const { response } = await ajax("/api/get/contestants").get();
      console.log(response);
      this.setState({
        ...this.state,
        contestants: JSON.parse(response)
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  /**
   * Handles if answer is correct
   * @param {Number} qid question id
   * @param {Number} contestID Contestants id
   */
  rightHandle(qid, contestID) {
    return () => {
      if (this.state.correct[`c${contestID}`][qid] === null) {
        const newState = {
          ...this.state
        }
        newState.ans[`c${contestID}`][qid] += " ✔️";
        newState.correct[`c${contestID}`][qid] = true;
        this.setState(newState);

        socket.emit("mark-correct", { qid, id: contestID });
      }

      /**socket.emit("add-custom", {
        id: contestID,
        value: 3
      });

      // Check if gets bounus
      if (!this.state.correct[`c${contestID}`].includes(false)) {
        socket.emit("add-custom", {
          id: contestID,
          value: 15
        });
      }*/
    }
  }

  /**
   * Handles if answer is wrong
   * @param {Number} qid question id
   * @param {Number} contestID Contestants id
   */
  wrongHandle(qid, contestID) {
    return () => {
      if (this.state.correct[`c${contestID}`][qid] === null) {
        const newState = {
          ...this.state
        }
        newState.ans[`c${contestID}`][qid] += " ❌";
        newState.correct[`c${contestID}`][qid] = false;
        this.setState(newState);

        socket.emit("mark-wrong", { qid, id: contestID });
      }
    }
  }

  /**
   * Checks and awards points
   */
  check() {
    // Go through each array
    this.state.contestants.forEach(contest => {
      let score = 0;
      for (const value of this.state.correct[`c${contest.id}`]) {
        if (value === true) {
          // Add 3
          score += 3;
        } else if (value === false) {
          // LOSE ALL POINTS
          score = 0;
          break;
        }
      }
      // If score is 15, add bounus as all correct
      if (score === 12) {
        score += 12;
      }

      // Send
      socket.emit("add-custom", {
        id: contest.id,
        value: score
      });
    });
    this.clear();
  }

  /**
   * Clears ans
   */
  clear() {
    this.setState({ 
      contestants: this.state.contestants,
      ...defaultState()
    });
    socket.emit("clear-written", { clear: true });
  }

  render() {
    return (
      <div className="written-wrapper">
        <table className="written-table">
          <thead>
            <tr>
              <th>Contestants</th>
              <th>Question 1</th>
              { this.props.isManager ? <th><FontAwesome name="check" /></th> : null }
              { this.props.isManager ?  <th><FontAwesome name="times" /></th>  : null }
              <th>Question 2</th>
              { this.props.isManager ? <th><FontAwesome name="check" /></th> : null }
              { this.props.isManager ? <th><FontAwesome name="times" /></th> : null }
              <th>Question 3</th>
              { this.props.isManager ? <th><FontAwesome name="check" /></th> : null }
              { this.props.isManager ? <th><FontAwesome name="times" /></th> : null }
              <th>Question 4</th>
              { this.props.isManager ? <th><FontAwesome name="check" /></th> : null }
              { this.props.isManager ? <th><FontAwesome name="times" /></th> : null }
            </tr>
          </thead>
          <tbody>
            {
              this.state.contestants.map(
                contest => <tr>
                  <td>{contest.name}</td>
                  <td className={`submitted-${this.state.submited[`c${contest.id}`][0]}`}>{this.state.ans[`c${contest.id}`][0]}</td>
                  { 
                    this.props.isManager ? <td className="written-right"><button onClick={this.rightHandle(0, contest.id)}><FontAwesome name="check" /></button></td> : null
                  }
                  {
                    this.props.isManager ? <td className="written-wrong"><button onClick={this.wrongHandle(0, contest.id)}><FontAwesome name="times" /></button></td> : null
                  }
                  <td className={`submitted-${this.state.submited[`c${contest.id}`][1]}`}>{this.state.ans[`c${contest.id}`][1]}</td>
                  {
                    this.props.isManager ? <td className="written-right"><button onClick={this.rightHandle(1, contest.id)}><FontAwesome name="check" /></button></td> : null
                  }
                  {
                    this.props.isManager ? <td className="written-wrong"><button onClick={this.wrongHandle(1, contest.id)}><FontAwesome name="times" /></button></td> : null
                  }
                  <td className={`submitted-${this.state.submited[`c${contest.id}`][2]}`}>{this.state.ans[`c${contest.id}`][2]}</td>
                  {
                    this.props.isManager ? <td className="written-right"><button onClick={this.rightHandle(2, contest.id)}><FontAwesome name="check" /></button></td> : null
                  }
                  {
                    this.props.isManager ? <td className="written-wrong"><button onClick={this.wrongHandle(2, contest.id)}><FontAwesome name="times" /></button></td> : null
                  }
                  <td className={`submitted-${this.state.submited[`c${contest.id}`][3]}`}>{this.state.ans[`c${contest.id}`][3]}</td>
                  {
                    this.props.isManager ? <td className="written-right"><button onClick={this.rightHandle(3, contest.id)}><FontAwesome name="check" /></button></td> : null
                  }
                  {
                    this.props.isManager ? <td className="written-wrong"><button onClick={this.wrongHandle(3, contest.id)}><FontAwesome name="times" /></button></td> : null
                  }
                </tr>
              )
            }
          </tbody>
        </table>
        { this.props.isManager ? <Button className="check-btn" onClick={this.check} bsStyle="primary" bsSize="large">Confirm</Button> : null }
        { this.props.isManager ? <Button className="check-btn" onClick={this.clear} bsStyle="danger" bsSize="large">Clear</Button> : null }
      </div>
    )
  }
}

export class AdminWrittenContainer extends Component {
  render() {
    return (
      <ShowWritten isManager={true} />
    )
  }
}