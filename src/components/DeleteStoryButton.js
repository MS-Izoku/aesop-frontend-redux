import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteStory, setCurrentStory } from "../actions/storyActions";

import Button from "react-bootstrap/Button";

const DeleteStoryButton = props => {
  return (
    <Button
      onClick={() => {
        props.history.push("/home")
        props.deleteStory(props.user.currentStory);
      }}
    >
      Delete Story
    </Button>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    stories: state.stories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteStory: storyObj => dispatch(deleteStory(storyObj)),
    setCurrentStory: storyObj => dispatch(setCurrentStory(storyObj))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DeleteStoryButton)
);
