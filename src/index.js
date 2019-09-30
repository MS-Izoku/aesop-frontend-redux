import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import "bootstrap/dist/css/bootstrap.min.css";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers/rootReducer.js";
import { BrowserRouter as Router, Route } from "react-router-dom";

//#region Pages
import App from "./App";
import LoginPage from "./pages/LoginPage";
import StoryHub from "./pages/StoryHub";
import CharacterManager from "./pages/CharacterManager";
import ChapterEditor from "./pages/ChapterEditor";
import SignUp from "./pages/SignUp";
import StoryEditor from './pages/StoryEditor'

import CharacterHub from "./pages/CharacterHub";
//#endregion



const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(rootReducer, middleware);

//const store = createStore(rootReducer, applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Route exact path="/" component={App} store={store} />

        <Route
          exact
          path="/chaptereditor/:story_id/:chapter_id"
          component={ChapterEditor}
          store={store}
        />

        <Route exact path="/login" component={LoginPage} store={store} />
        <Route exact path="/stories" component={StoryHub} store={store} />
        <Route exact path="/stories/:story_id" component={StoryEditor} />
        <Route exact path="/cm" component={CharacterManager} store={store} />
        <Route exact path="/cm/:story_id/:character_id" component={CharacterManager} store={store} />
        <Route exact path="/signup" component={SignUp} store={store} />
        <Route
          exact
          path="/characters/:story_id"
          component={CharacterHub}
          store={store}
        />
      </React.Fragment>
    </Router>
  </Provider>,

  document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
