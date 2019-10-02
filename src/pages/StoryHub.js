import React, { Component } from "react";
import { connect } from "react-redux";
import NavHeader from "../containers/NavHeader";
import StoryCarousel from "../components/StoryCarousel";
import PageFooter from "../components/PageFooter";

class StoryHub extends Component {
  render() {
    return (
      <div>
        <NavHeader />
     
          <StoryCarousel />

        <PageFooter />
        {/* <StoryCarousel /> */}
      </div>
    );
  }
}

export default StoryHub;
