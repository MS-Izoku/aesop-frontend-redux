import React from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteChapter } from "../actions/chapterActions";
import {
  setCurrentChapterDispatch,
  removeChapterDispatch as removeChapterFromUserDispatch
} from "../actions/userActions";
import { removeChapterFromStoryDispatch } from "../actions/storyActions";

const ChapterDeleteModal = props => {
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>
          Are you sure you want to delete {"XxX chapter XxX"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>If you delete this, there will be no way of getting it back.</p>
      </Modal.Body>

      {/* BACKEND FEARURE: Don't Ask Me Again (checkbox )*/}
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            // conigure this later to get the chapter before this,
            // if there is no chapter - 1 , get the chapter with the index closes to this
            // on the lower side
          }}
        >
          Keep Chapter
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            props.removeChapterFromUserDispatch(props.chapter);
            props.removeChapterFromStoryDispatch(props.chapter);
            if (props.chapter === props.currentChapter)
              props.setCurrentChapterDispatch(props.chapters[0]);
            else props.setCurrentChapterDispatch(props.chapters[0]);
            props.deleteChapter(props.chapter);
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

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
