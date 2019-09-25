import React from "react";
//import logo from './logo.svg';
import "./App.css";

//import ChapterEditor from "./pages/ChapterEditor.js";
import NavHeader from "./containers/NavHeader.js";
import { withRouter } from "react-router";

function App() {
  return (
    <div className="App">
      <NavHeader />
      <div>
        <h1>Welcome to a Glorified Text Editor App</h1>
      </div>
    </div>
  );
}

export default withRouter(App);
