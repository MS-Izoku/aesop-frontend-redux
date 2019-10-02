import React, { Component } from "react";
import ChapterEditorFootNotebar from "../components/ChapterEditorFootNotebar";
import ChapterEditorCharacterbar from "../components/ChapterEditorCharacterbar";
import { withRouter } from "react-router";
import { getFootnotes, setCurrentFootnote } from "../actions/footnoteActions";
import {connect } from 'react-redux'

class RTEditorRightBar extends Component {
  render() {
    return (
      <div className="col stretchHeight eggshell">
        <ChapterEditorCharacterbar />
        <hr />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { footnotes: state.footnotes };
};

const mapDispatchToProps = dispatch => {
  return {
    getFootnotes: (chapterID, storyID) =>
      dispatch(getFootnotes(chapterID, storyID))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RTEditorRightBar)
);
