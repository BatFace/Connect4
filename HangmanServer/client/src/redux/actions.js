import makeServerRequest from "../makeServerRequest";

export const LOAD_GAME_STATUSES_SUCCEEDED =
  "hangman/LOAD_GAME_STATUSES_SUCCEEDED";
export const loadGameStatusesSucceeded = statuses => ({
  type: LOAD_GAME_STATUSES_SUCCEEDED,
  payload: {
    statuses
  }
});

export const getGameStatuses = () => dispatch => {
  return makeServerRequest(`${process.env.REACT_APP_API_URL}/api/users?full=true`, "GET", {})
    .then(result => dispatch(loadGameStatusesSucceeded(result)))
    .catch(e => {
      alert(e.payload);
    });
};
