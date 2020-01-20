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

import LoginPage from "./pages/LoginPage";
import StoryHub from "./pages/StoryHub";
import CharacterManager from "./pages/CharacterManager";
import ChapterEditor from "./pages/ChapterEditor";
import SignUp from "./pages/SignUp";
import StoryEditor from "./pages/StoryEditor";

import CharacterHub from "./pages/CharacterHub";
//#endregion

const middleware = applyMiddleware(thunkMiddleware);



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
