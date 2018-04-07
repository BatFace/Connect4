import { connect } from "react-redux";
import App from "./App";
import { getGameStatuses } from "../redux/actions";

export const mapStateToProps = ({ statuses }) => ({
  statuses
});

export const mapDispatchToProps = dispatch => ({
  loadGameStatuses: () => dispatch(getGameStatuses())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
