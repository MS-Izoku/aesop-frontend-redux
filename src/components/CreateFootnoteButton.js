import React from "react";
import { connect } from "react-redux";

import { postFootNote } from "../actions/footnoteActions";

import Button from "react-bootstrap/Button";

const CreateFootnoteButton = props => {
  return (
    <Button
      onClick={() => {
        props.postFootNote(props.chapter.id, props.story.id);
      }}
    >
      New Note
    </Button>
  );
};
const mapStateToProps = state => {
  return {
    chapter: state.user.currentChapter,
    story: state.user.currentStory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postFootNote: (chapterID, storyID) =>
      dispatch(postFootNote(chapterID, storyID))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateFootnoteButton);
