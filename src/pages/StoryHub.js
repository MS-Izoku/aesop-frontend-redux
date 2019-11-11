import React, { Component } from "react";
import { connect } from "react-redux";
import NavHeader from "../containers/NavHeader";
import StoryCarousel from "../components/StoryCarousel";
import PageFooter from "../components/PageFooter";

class StoryHub extends Component {
  constructor() {
    super();
    this.state = {
      bottomText: ""
    };
  }
  setBottomText = bottomText => {
    this.setState({ bottomText });
  };
  render() {
    return (
      <div>
        <NavHeader />
        <div className="storyHub grey-light">
          <p className="mt-5"><hr/></p>
          <StoryCarousel setBottomText={this.setBottomText} />
          <div id="carousel-bottom-text" className="container-fluid">
            <div className="row">
              <div className="col"></div>
              <div className="mb-5 mt-5"/>
              <div className="col"></div>
            </div>
          </div>
        </div>
        <PageFooter />
        {/* <StoryCarousel /> */}
      </div>
    );
  }
}

export default StoryHub;
