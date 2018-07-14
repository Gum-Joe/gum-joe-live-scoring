/**
 * @overview Admin for written round
 */
import React, { Component } from "react";
import FontAwesome from "react-fontawesome";

export default class AdminWritten extends Component {
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
            <tr>
              <td>Contest</td>
              <td>1</td>
              <td className="written-right"><button className="written-right"><FontAwesome name="check" /></button></td>
              <td><FontAwesome name="times" /></td>
              <td>2</td>
              <td><FontAwesome name="check" /></td>
              <td><FontAwesome name="times" /></td>
              <td>3</td>
              <td><FontAwesome name="check" /></td>
              <td><FontAwesome name="times" /></td>
              <td>4</td>
              <td><FontAwesome name="check" /></td>
              <td><FontAwesome name="times" /></td>
              <td>5</td>
              <td><FontAwesome name="check" /></td>
              <td><FontAwesome name="times" /></td>
            </tr>
            <tr>
              <td>Contest 2</td>
              <td>1</td>
              <td><FontAwesome name="check" /></td>
              <td><FontAwesome name="times" /></td>
              <td>2</td>
              <td><FontAwesome name="check" /></td>
              <td><FontAwesome name="times" /></td>
              <td>3</td>
              <td><FontAwesome name="check" /></td>
              <td><FontAwesome name="times" /></td>
              <td>4</td>
              <td><FontAwesome name="check" /></td>
              <td><FontAwesome name="times" /></td>
              <td>5</td>
              <td><FontAwesome name="check" /></td>
              <td><FontAwesome name="times" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}