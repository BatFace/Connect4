import { LOAD_GAME_STATUSES_SUCCEEDED } from "./actions";

const initialState = {
  statuses: []
};

const hangman = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAME_STATUSES_SUCCEEDED: {
      return {
        ...state,
        statuses: action.payload.statuses
      };
    }
    default:
      return state;
  }
};

export default hangman;
