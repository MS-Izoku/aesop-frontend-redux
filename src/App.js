import React from "react";
//import logo from './logo.svg';
import "./App.css";

import Button from "react-bootstrap/Button";
//import ChapterEditor from "./pages/ChapterEditor.js";
import NavHeader from "./containers/NavHeader.js";
import { withRouter } from "react-router";

function App() {
  return (
    <div className="App">
      <NavHeader />
      <div>
        <h1>Welcome to AESOP</h1>
        <Button href="/stories">Start Writing!</Button>
        <div id="mission-statement">
          <p>
            We here at AESOP are dedicated to our writers, helping them to
            organize their idea for worldbuilding, writing, and anything else
            you can put up here!
          </p>
        </div>
      </div>
    </div>
  );
}

export default withRouter(App);
