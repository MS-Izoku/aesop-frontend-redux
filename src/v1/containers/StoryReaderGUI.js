import React, { Component } from "react";
import { connect } from "react-redux";
import { getStories } from "../../actions/storyActions";

class StoryReaderGUI extends Component {
  render() {
    return <div>Populate this with the story, figure out the GUI later</div>;
  }
}

const mapStateToProps = state => {
  return {
    story: state.story
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStories: () => {
      dispatch(getStories());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryReaderGUI);
