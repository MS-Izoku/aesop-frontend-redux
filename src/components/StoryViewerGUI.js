import React, { Component } from "react";
import { withRouter } from "react-router";

class StoryViewerGUI extends Component {
  render() {
    return (
      <div className="container-fluid px-3 grey-light pt-2">
        <div className="row">
          <div className="col"></div>
          <div className="col-lg-8">
            <h2 className="text-center">
              <span> <hr/>
              {this.props.currentStory.title}
              </span><hr/>
              </h2>
            <p className="text-center">
              <em>{this.props.currentStory.pitch}</em>
            </p>
            <p className="text-center">
              {" "}
              {this.props.currentStory.high_concept}
            </p>
          </div>
          <div className="col"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(StoryViewerGUI);
