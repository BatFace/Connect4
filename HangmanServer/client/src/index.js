import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./css/index.css";
import AppContainer from "./components/AppContainer";
import createStore from "./redux/store";

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);
