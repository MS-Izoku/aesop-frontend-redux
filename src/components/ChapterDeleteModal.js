import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteChapter } from "../actions/chapterActions";
import {
  setCurrentChapterDispatch,
  removeChapterDispatch as removeChapterFromUserDispatch
} from "../actions/userActions";
import { removeChapterFromStoryDispatch } from "../actions/storyActions";

class ChapterDeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleToggle = () => {
    this.props.toggleDeleteChapterModal();
  };

  render() {
    return (
      <div id="footnote-modal">
        <Modal show={this.props.show} onHide={this.handleToggle}>
          <Modal.Body>
            <Modal.Header closeButton>
              <Modal.Title>
                Are you sure you want to delete {"XxX chapter XxX"}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>
                If you delete this, there will be no way of getting it back.
              </p>
            </Modal.Body>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleToggle}>
                Keep Chapter
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  this.props.removeChapterFromUserDispatch(this.props.chapter);
                  this.props.removeChapterFromStoryDispatch(this.props.chapter);
                  if (this.props.chapter === this.props.currentChapter)
                    this.props.setCurrentChapterDispatch(
                      this.props.chapters[0]
                    );
                  else
                    this.props.setCurrentChapterDispatch(
                      this.props.chapters[0]
                    );
                  this.props.deleteChapter(this.props.chapter);

                  this.handleToggle();
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentChapter: state.user.currentChapter,
    chapters: state.chapters.allChapters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteChapter: chapterObj => dispatch(deleteChapter(chapterObj)),
    setCurrentChapterDispatch: chapterObj =>
      dispatch(setCurrentChapterDispatch(chapterObj)),
    removeChapterFromStoryDispatch: chapterObj =>
      dispatch(removeChapterFromStoryDispatch(chapterObj)),
    removeChapterFromUserDispatch: chapterObj =>
      dispatch(removeChapterFromUserDispatch(chapterObj))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChapterDeleteModal);
