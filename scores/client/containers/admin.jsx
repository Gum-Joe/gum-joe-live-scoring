/**
 * @overview ScoresAdmin container
 */
import { connect } from "react-redux";
import ScoresAdminRAW from "../components/admin";

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ScoresAdminRAW);
