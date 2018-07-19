/**
 * @overview Admin for written round
 */
import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import ajax from "es-ajax";
import io from "socket.io-client";
const socket = io();

export default class AdminWritten extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contestants: [],
      ans: {
        c0: ["", "", "", "", ""],
        c1: ["", "", "", "", ""],
        c2: ["", "", "", "", ""],
        c3: ["", "", "", "", ""],
        c4: ["", "", "", "", ""],
      },
      correct: {
        c0: [false, false, false, false, false],
        c1: [false, false, false, false, false],
        c2: [false, false, false, false, false],
        c3: [false, false, false, false, false],
        c4: [false, false, false, false, false],
      }
    }
    this.rightHandle = this.rightHandle.bind(this);
    this.wrongHandle = this.wrongHandle.bind(this);
  }
  async componentDidMount() {
    try {
      socket.on("new-answer", answer => {
        // Handle answer
        const newState = {
          ...this.state,
        };
        newState.ans[`c${answer.id}`][answer.qid - 1] = answer.ans;
        this.setState(newState);
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
      const newState = {
        ...this.state
      }
      newState.ans[`c${contestID}`][qid] += " ✓";
      newState.correct[`c${contestID}`][qid] = true;
      this.setState(newState);

      socket.emit("add-custom", {
        id: contestID,
        value: 3
      });

      // Check if gets bounus
      if (!this.state.correct[`c${contestID}`].includes(false)) {
        socket.emit("add-custom", {
          id: contestID,
          value: 15
        });
      }
    }
  }

  /**
   * Handles if answer is wrong
   * @param {Number} qid question id
   * @param {Number} contestID Contestants id
   */
  wrongHandle(qid, contestID) {
    return () => {
      const newState = {
        ...this.state
      }
      newState.ans[`c${contestID}`][qid] += " ❌";
      newState.correct[`c${contestID}`][qid] = true;
      this.setState(newState);
    }
  }

  render() {
    return (
      <div className="written-wrapper">
        <table className="written-table">
          <thead>
            <tr>
              <th>Contestants</th>
              <th>Question 1</th>
              <th><FontAwesome name="check" /></th>
              <th><FontAwesome name="times" /></th>
              <th>Question 2</th>
              <th><FontAwesome name="check" /></th>
              <th><FontAwesome name="times" /></th>
              <th>Question 3</th>
              <th><FontAwesome name="check" /></th>
              <th><FontAwesome name="times" /></th>
              <th>Question 4</th>
              <th><FontAwesome name="check" /></th>
              <th><FontAwesome name="times" /></th>
              <th>Question 5</th>
              <th><FontAwesome name="check" /></th>
              <th><FontAwesome name="times" /></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.contestants.map(
                contest => <tr>
                  <td>{contest.name}</td>
                  <td>{this.state.ans[`c${contest.id}`][0]}</td>
                  <td className="written-right"><button onClick={this.rightHandle(0, contest.id)}><FontAwesome name="check" /></button></td>
                  <td className="written-wrong"><button onClick={this.wrongHandle(0, contest.id)}><FontAwesome name="times" /></button></td>
                  <td>{this.state.ans[`c${contest.id}`][1]}</td>
                  <td className="written-right"><button onClick={this.rightHandle(1, contest.id)}><FontAwesome name="check" /></button></td>
                  <td className="written-wrong"><button onClick={this.wrongHandle(1, contest.id)}><FontAwesome name="times" /></button></td>
                  <td>{this.state.ans[`c${contest.id}`][2]}</td>
                  <td className="written-right"><button onClick={this.rightHandle(2, contest.id)}><FontAwesome name="check" /></button></td>
                  <td className="written-wrong"><button onClick={this.wrongHandle(2, contest.id)}><FontAwesome name="times" /></button></td>
                  <td>{this.state.ans[`c${contest.id}`][3]}</td>
                  <td className="written-right"><button onClick={this.rightHandle(3, contest.id)}><FontAwesome name="check" /></button></td>
                  <td className="written-wrong"><button onClick={this.wrongHandle(3, contest.id)}><FontAwesome name="times" /></button></td>
                  <td>{this.state.ans[`c${contest.id}`][4]}</td>
                  <td className="written-right"><button onClick={this.rightHandle(4, contest.id)}><FontAwesome name="check" /></button></td>
                  <td className="written-wrong"><button onClick={this.wrongHandle(4, contest.id)}><FontAwesome name="times" /></button></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}