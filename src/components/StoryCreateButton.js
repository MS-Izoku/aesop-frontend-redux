import React from "react";
import { connect } from "react-redux";
import { postStory } from "../actions/storyActions";

import Button from "react-bootstrap/Button";
const StoryCreateButton = props => {
  return (
    <Button
      onClick={() => {
        props.postStory(props.user.id);
      }}
    >
      New Story
    </Button>
  );
};

const mapStateToProps = state => {
  return { user: state.user.currentUser };
};

const mapDispatchToProps = dispatch => {
  return {
    postStory: userID => dispatch(postStory(userID))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryCreateButton);
