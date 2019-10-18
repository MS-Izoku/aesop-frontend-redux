import React, { Component } from "react";
import ChapterEditorFootNotebar from "../components/ChapterEditorFootNotebar";
import ChapterEditorCharacterbar from "../components/ChapterEditorCharacterbar";
import { withRouter } from "react-router";
import { getFootnotes, setCurrentFootnote } from "../actions/footnoteActions";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";

//import ChapterEditorFootNotebar from "../components/ChapterEditorFootNotebar";

class RTEditorRightBar extends Component {
  render() {
    return (
      <div className="col eggshell">
        <div className="pt-2 pb-2">
          <Button
            bsPrefix="btn btn-block red-3 custom-btn"
            href={`/stories/${this.props.match.params.story_id}`}
          >
            Chapter Viewer
          </Button>
          <ChapterEditorCharacterbar />
          <ChapterEditorFootNotebar toggleModal={this.props.toggleModal}/>
          <hr />
        </div>
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
