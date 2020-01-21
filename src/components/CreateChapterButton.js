import React from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { postChapter } from "../actions/chapterActions";

const CreateChapterButton = props => {
  return <Button onClick={() => {
      props.postChapter(props.currentStory.id)
  }}> New Chapter </Button>;
};

const mapStateToProps = state => {
  return { stories: state.stories, currentStory: state.user.currentStory };
};

const mapDisaptchToProps = dispatch => {
  return {
    postChapter: chapterID => dispatch(postChapter(chapterID))
  };
};

export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(CreateChapterButton);
