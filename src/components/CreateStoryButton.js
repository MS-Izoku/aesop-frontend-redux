import React from "react";
import { connect } from "react-redux";
import { postStory } from "../actions/storyActions";
import Button from "react-bootstrap/Button";

const CreateStoryButton = props => {
  return (
    <Button
      onClick={() => {
        props.postStory(props.user.currentUser.id);
      }}
    >
      Create Story
    </Button>
  );
};

const mapStateToProps = state =>{
    return { user: state.user}
}
const mapDispatchToProps = dispatch => {
  return { postStory: userID => dispatch(postStory(userID)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateStoryButton);
