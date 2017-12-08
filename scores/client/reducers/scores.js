/**
 * @overview Redux scores reducer
 */
import { INCREMENT, DEINCREMENT, SET } from "./constants";
import io from "socket.io-client";
import ajax from "es-ajax";

const socket = io();

// Set default state
let defaultState = {
  scores: []
};
ajax("/api/get/scores")
  .get()
  .then((res) => {
    defaultState = res;
  })
  .catch((err) => {
    throw err;
  });

export default function reducer(state = defaultState, action) {
  switch (action.type) {
  case INCREMENT: {
    const newScores = Array.concat(state.scores);
    newScores[action.id].score++;
    // Emit update
    socket.emit("add-one", {
      id: action.id,
      score: newScores[action.id],
    });
    // Return
    return {
      ...state,
      scores: newScores
    };
  }
  case DEINCREMENT: {
    const newScores = Array.concat(state.scores);
    newScores[action.id].score--;
    // Emit update
    socket.emit("subtract-one", {
      id: action.id,
      score: newScores[action.id],
    });
    // Return
    return {
      ...state,
      scores: newScores
    };
  }
  case SET: {
    const newScores = Array.concat(state.scores);
    newScores[action.id].score = action.score;
    // Emit update
    socket.emit("change-score", {
      id: action.id,
      score: action.score,
    });
    // Return
    return {
      ...state,
      scores: newScores
    };
  }
  case "INJECT": {
    return {
      scores: action.scores
    };
  }
  default: {
    return state;
  }
  }
}
