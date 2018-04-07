import reducer from "./reducer";

import { applyMiddleware, createStore as createReduxStore } from "redux";

import thunk from "redux-thunk";

const middleware = [thunk];

export default initialState => {
  return createReduxStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
  );
};
