import React from "react";
//import logo from './logo.svg';
import "./App.css";

import Button from "react-bootstrap/Button";
//import ChapterEditor from "./pages/ChapterEditor.js";
import NavHeader from "./containers/NavHeader.js";
import PageFooter from "./components/PageFooter";
import { withRouter } from "react-router";

import JumboTron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

function App() {
  return (
    <div className="App grey-light">
      <NavHeader />
      <div className="container">
        <div>
          <JumboTron  id="mission-statement" className="mt-5 rounded light-grey">
     
            <h1 className="text-center main-dark-text">Welcome to AESOP</h1>
            
            <hr/>
            <p className="text-center main-dark-text">
              We here at AESOP are dedicated to our writers, helping them to
              organize their idea for worldbuilding, writing, and anything else
              you can put up here!
            </p>
            <div className="text-center">
              <a href="https://en.wikipedia.org/wiki/Aesop">
                <Image
                  roundedCircle
                  className="landingImage"
                  src={
                    "https://i.pinimg.com/originals/39/26/5f/39265fd823610b50192aff49cec6d8de.jpg"
                  }
                />
              </a>
            </div>

            <footer className="container-fluid">
              <hr />
              <Button size="lg" href="/stories" bsPrefix="btn red-3 custom-btn btn-block">
                Start Writing!
              </Button>
            </footer>
          </JumboTron>
        </div>
      </div>
      <PageFooter />
    </div>
  );
}

export default withRouter(App);
