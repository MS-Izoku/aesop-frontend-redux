import React from "react";
import { connect } from "react-redux";
import { postChapter } from "../actions/chapterActions";
import Button from "react-bootstrap/Button";

const ChapterCreateButton = props => {
  return (
    <Button
      onClick={() => {
        props.postChapter(props.currentStory.id);
      }}
    >
      New Chapter
    </Button>
  );
};

const mapStateToProps = state => {
  return {
    currentStory: state.user.currentStory
  };
};

const mapDisatchToProps = dispatch => {
  return {
    postChapter: storyID => dispatch(postChapter(storyID)),
  };
};

export default connect(
  mapStateToProps,
  mapDisatchToProps
)(ChapterCreateButton);
