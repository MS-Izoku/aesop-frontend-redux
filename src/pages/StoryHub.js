import React, { Component } from "react";
import { connect } from "react-redux";
import NavHeader from "../containers/NavHeader";
import StoryCarousel from "../components/StoryCarousel";

class StoryHub extends Component {
  render() {
    return (
      <div>
        <NavHeader />
        <div className="container-fluid">
          <StoryCarousel />
        </div>
      </div>
    );
  }
}

export default StoryHub;
