import { INCREMENT, DEINCREMENT, SET } from "../reducers/constants";

export const increment = (id, score) => {
  return {
    type: INCREMENT,
    id,
  };
};

export const deincrement = (id, score) => {
  return {
    type: DEINCREMENT,
    id,
  };
};

export const set = (id, score) => {
  return {
    type: SET,
    id,
    score,
  };
};
