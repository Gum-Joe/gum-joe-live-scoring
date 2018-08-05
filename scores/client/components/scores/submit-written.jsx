import React, { Component } from "react";
import ajax from "es-ajax";
import { Button } from "react-bootstrap";
import { Col, Grid, Row, FormControl } from "react-bootstrap";
import io from "socket.io-client";
const socket = io();

export default class SubmitWritten extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPerson: false,
      contestants: [],
      contestant: "",
      a1: "",
      a2: "",
      a3: "",
      a4: "",
      ans: [],
      questions: [1, 2, 3, 4]
    }
  }
  async componentWillMount() {
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    socket.on("clear-written-server", () => {
      this.setState({
        ...this.state,
        a1: "",
        a2: "",
        a3: "",
        a4: "",
        a5: "",
        ans: []
      });
    })
    try {
      const { response } = await ajax("/api/get/contestants").get();
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
   * Returns function to handle change of input
   * @param {Number} qid Question ID
   * @returns {Function}
   */
  handleChange(qid) {
    return event => {
      const newState = {}
      newState[`a${qid}`] = event.target.value;
      this.setState({...this.state, ...newState});
    }
  }

   /**
   * Returns function to handle submission of input
   * @param {Number} qid Question ID
   * @returns {Function}
   */
  handleInput(qid) {
    return async () => {
      try {
        this.setState({ ...this.state, ans: [ ...this.state.ans, qid ] })
        /** await ajax("/api/post/submit-ans").post({
          id: this.state.contestant.id,
          qid,
          ans: this.state[`a${qid}`]
        }); */
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/post/submit-ans", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify({
          id: this.state.contestant.id,
          qid,
          ans: this.state[`a${qid}`]
        }));

        socket.emit("add-written", {
          id: this.state.contestant.id,
          qid,
          ans: this.state[`a${qid}`]
        });

      } catch (err) {
        console.error(err);
        throw err;
      } finally {
        console.log(`Answer ${qid} submitted`);
      }
    }
  }

  render() {
    return (
      !this.state.selectedPerson ?
        <div className="home-wrapper">
          <h1 className="home-head">Who are you?</h1>
          <div className="home-buttons">
            {
              this.state.contestants.map(
                con => <Button bsStyle="primary" bsSize="large" onClick={() => this.setState({ ...this  .state, contestant: con, selectedPerson: true }) }>{con.name}</Button>
              )
            }
          </div>
        </div>
        :
        <div className="scores-back submit-ans">
          <h3>Type your answers into the correct box below</h3>
          <Grid>
            { this.state.questions.map(
              q =>
              !this.state.ans.includes(q) ? <Row>
                <Col md={6}><FormControl type="text" placeholder={`Answer ${q}`} onChange={this.handleChange(q)} /></Col>
                <Col sm={1}><Button type="submit" bsStyle="success" onClick={this.handleInput(q)}>Submit</Button></Col>
              </Row>
              :
              <h5>{this.state[`a${q}`]}</h5>
              ) }
          </Grid>
        </div>
    )
  }
}