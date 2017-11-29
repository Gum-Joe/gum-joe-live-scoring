/**
 * @overview Store provider
 */
import { createStore } from "redux";
import scores from "./scores";

export default createStore(
  scores,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
