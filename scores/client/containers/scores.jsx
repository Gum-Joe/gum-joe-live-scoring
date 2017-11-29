/**
 * @overview Scores container
 */
import { connect } from "react-redux";
import ScoresRAW from "../components/scores";

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ScoresRAW);
