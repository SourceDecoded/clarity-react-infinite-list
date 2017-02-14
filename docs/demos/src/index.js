import "rxjs";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import Main from "./components/views/Main";

ReactDOM.render(
  <Provider store={configureStore()}>
    <Main />
  </Provider>,
  document.getElementById("root")
);