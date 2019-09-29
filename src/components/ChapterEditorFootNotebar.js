import React, { Component } from "react";
import { getFootnotes, postFootNote } from "../actions/footnoteActions.js";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";

class ChapterEditorFootnoteBar extends Component {

  componentDidMount() {
    this.props.getFootnotes(
      this.props.match.params.chapter_id,
      this.props.match.params.story_id
    );
  }

  renderListItems = () => {
    return this.props.footnotes.map(note => {
      return (
        <ListGroup.Item key={note.id}>
          <Button
            onClick={() => {
              this.setupModal(note);
            }}
          >
            {note.title} Whee
          </Button>
        </ListGroup.Item>
      );
    });
  };

  setupModal = note => {
    console.log(note)
    this.props.setCurrentFootnote(note);
    this.props.toggleModal();
  };


  postNewFootNote = () => {
    this.props.postFootNote(this.props.currentChapter);
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <ListGroup>
          {this.renderListItems()}
          <ListGroup.Item>
            <Button onClick={this.postNewFootNote}>New Note</Button>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { footnotes: state.footnotes };
};

const mapDispatchToProps = dispatch => {
  return {
    getFootnotes: chapter => dispatch(getFootnotes(chapter)),
    postFootNote: (chapter, story) => dispatch(postFootNote(chapter, story))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChapterEditorFootnoteBar)
);
