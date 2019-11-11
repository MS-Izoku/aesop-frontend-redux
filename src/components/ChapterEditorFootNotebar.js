import React, { Component } from "react";
import {
  getFootnotes,
  postFootNote,
  setCurrentFootnote
} from "../actions/footnoteActions.js";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";

class ChapterEditorFootnoteBar extends Component {
  componentDidMount() {
    console.log(
      this.props.match.params.chapter_id,
      this.props.match.params.story_id
    );
    this.props.getFootnotes(
      this.props.match.params.chapter_id,
      this.props.match.params.story_id
    );
    console.log("Checking NoteBar Props:", this.props);
  }

  componentDidUpdate() {
    console.log("UPDATING NOTEBAR");
  }

  parseTime = time => {
    console.log(Date(time));
    return new Date(time);
  };

  // renderListItems = () => {
  //   const fns = this.props.footnotes.allNotes.sort((a, b) => {
  //     return this.parseTime(a.created_at) - this.parseTime(b.created_at);
  //   });
  //   console.log("Checking the fns", fns);
  //   return this.props.footnotes.allNotes.map(note => {
  //     console.log(note);
  //     return (
  //       <ListGroup.Item key={note.id}>
  //         <Button
  //           onClick={() => {
  //             this.setupModal(note);
  //           }}
  //         >
  //           {note.title} //Button
  //         </Button>
  //       </ListGroup.Item>
  //     );
  //   });
  // };

  renderListItems = () => {
    // const fns = this.props.footnotes.allNotes.sort((a, b) => {
    //   return this.parseTime(a.created_at) - this.parseTime(b.created_at);
    // });
    // console.log("Checking the fns", fns);
    console.log(this.props);
    return this.props.notes.map(note => {
      console.log(note);
      return (
        <ListGroup.Item key={note.id}>
          <Button
            onClick={() => {
              this.setupModal(note);
            }}
          >
            {note.title} //Button
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

const mapStateToProps = state => {
  return { footnotes: state.footnotes };
};

const mapDispatchToProps = dispatch => {
  return {
    getFootnotes: (chapterID, storyID) =>
      dispatch(getFootnotes(chapterID, storyID)),
    postFootNote: (chapterID, storyID) =>
      dispatch(postFootNote(chapterID, storyID)),
    setCurrentFootnote: footnoteID => dispatch(setCurrentFootnote(footnoteID))
  };
};

// export default withRouter(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(ChapterEditorFootnoteBar)
// );

export default withRouter(ChapterEditorFootnoteBar);
