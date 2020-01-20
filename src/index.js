import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import "bootstrap/dist/css/bootstrap.min.css";
//import { createLogger } from "redux-logger";
//import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers/rootReducer.js";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";


const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App store={store}/>
    </Router>
  </Provider>,

  document.getElementById("root")
);

serviceWorker.unregister();
