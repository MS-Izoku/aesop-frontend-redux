import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";

class ChapterEditorFootnoteBar extends Component {
  parseTime = time => {
    return new Date(time);
  };


  renderListItems = () => {
    return this.props.notes.map(note => {
      console.log(note);
      return (
        <ListGroup.Item key={note.id}>
          <Button
            onClick={() => {
              this.setupModal(note);
            }}
          >
            {note.title}
          </Button>
        </ListGroup.Item>
      );
    });
  };
  setupModal = note => {
    console.log("SETTING UP MODAL", this.props);
    this.props.setCurrentFootnote(note);
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

export default withRouter(ChapterEditorFootnoteBar);
