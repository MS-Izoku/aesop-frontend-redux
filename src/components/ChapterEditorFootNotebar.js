import React, { Component } from "react";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";

import {
  setCurrentFootnote,
  deleteFootNote,
  postFootNote
} from "../actions/footnoteActions";

class ChapterEditorFootnoteBar extends Component {
  parseTime = time => {
    // console.log(Date(time));
    return new Date(time);
  };

  renderListItems = () => {
    const chapterNotes = this.props.footnotes.allNotes.filter(note => {
      return note.chapter_id !== this.props.match.params.chapter_id;
    });

    return chapterNotes.map(note => {
      return (
        <div>
          <span>
            <h3
              onClick={() => {
                this.props.setCurrentFootnote(note);
                this.props.toggleModal();
              }}
            >
              {note.title}
            </h3>
            <div
              onClick={() => {
                this.props.deleteFootnote(
                  this.props.match.params.story_id,
                  note
                );
              }}
            >
              X
            </div>
          </span>
        </div>
      );
    });
  };

  setupModal = note => {
    console.log("SETTING UP MODAL", this.props);
    this.props.toggleModal();
  };

  postNewFootNote = () => {
    this.props.postFootNote(
      this.props.match.params.chapter_id,
      this.props.match.params.story_id
    );
  };

  render() {
    return (
      <div className="bg-info">
        {this.renderListItems()}
        <Button
          bsPrefix="btn btn-block btn-info"
          onClick={() => {
            this.postNewFootNote(
              this.props.match.params.chapter_id,
              this.props.match.params.story_id
            );
          }}
        >
          New Note
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { footnotes: state.footnotes };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentFootnote: footnote => dispatch(setCurrentFootnote(footnote)),
    deleteFootnote: (storyID, footnote) =>
      dispatch(deleteFootNote(storyID, footnote)),

    postFootNote: (chapterID, storyID) =>
      dispatch(postFootNote(chapterID, storyID))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChapterEditorFootnoteBar)
);
