import React from "react";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentStory } from "../actions/storyActions";

const StoryShowCard = props => {
  return (
    <div className="text-center card">
      <h3>{props.story.title}</h3>
      <p>{props.story.pitch}</p>
      <Button
        onClick={() => {
          console.log("SETTING STORY: " , props.story)
          props.setCurrentStory(props.story);
          props.history.push(`/storyManager/`);
        }}
      >
        Go To
      </Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return { setCurrentStory: storyObj => dispatch(setCurrentStory(storyObj)) };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(StoryShowCard)
);
