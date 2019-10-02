import React, { Component } from "react";
import { connect } from "react-redux";
import NavHeader from "../containers/NavHeader";
import StoryCarousel from "../components/StoryCarousel";
import PageFooter from "../components/PageFooter";

class StoryHub extends Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div className="grey-light">
        <NavHeader />
        <div className="container-fluid storyHub">
          <StoryCarousel />
        </div>
        <PageFooter />
        {/* <StoryCarousel /> */}
      </div>
    );
  }
}

export default StoryHub;
