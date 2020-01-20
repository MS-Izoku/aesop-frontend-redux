import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";
import {
  setCurrentChapterDispatch,
  updateUserChapterInStory
} from "../actions/userActions";
import { patchChapter } from "../actions/chapterActions";

import ChapterDeleteModal from "./ChapterDeleteModal";
import FootnoteModal from "./FootnoteModal";

class ChapterTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // footnoteModalActive: false,
      deleteChapterModalActive: false,
      chapterInEditor: {
        title: props.currentChapter.title,
        body: this.props.currentChapter.body
      },
      chapterID: this.props.currentChapter.id
    };
  }

  saveChapter = () => {
    const configuredChapterObj = Object.assign(
      {},
      {
        ...this.props.currentChapter,
        body: this.state.chapterInEditor.body,
        title: this.state.chapterInEditor.title
      }
    );
    this.props.setCurrentChapterDispatch(configuredChapterObj);
    this.props.updateUserChapterInStory(configuredChapterObj);
    this.props.patchChapter(configuredChapterObj);
  };

  autoSave = time => {
    this.interval = setInterval(() => {
      this.saveChapter();
    }, time);
  };

  //#region Lifecycle Methods
  componentDidMount() {
    setTimeout(() => {
      this.autoSave(1200000);
    }, 1000);
  }

  componentWillUpdate() {
    if (this.props.currentChapter.id !== this.state.chapterID) {
      this.setState({
        chapterInEditor: {
          ...this.state.chapterInEditor,
          title: this.props.currentChapter.title
        },
        chapterID: this.props.currentChapter.id
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  //#endregion

  //#region Chapter Change Handlers
  // used for things outside of CKEditor
  handleChange = event => {
    this.setState({
      chapterInEditor: {
        ...this.state.chapterInEditor,
        title: event.target.value
      }
    });
  };

  // used specifically for CKEditor
  handleChapterChange = (eventName, data) => {
    this.setState({
      chapterInEditor: { ...this.state.chapterInEditor, [eventName]: data }
    });
  };
  //#endregion

  //#region Modal Toggling
  toggleFootnoteModal = () => {
    console.log("Toggling");
    this.setState({ footnoteModalActive: !this.state.footnoteModalActive });
  };

  toggleDeleteChapterModal = () => {
    this.setState({
      deleteChapterModalActive: !this.state.deleteChapterModalActive
    });
  };
  //#endregion

  render() {
    return (
      <>
        {/* <Button onClick={this.toggleFootnoteModal}>FOOTNOTE MODAL</Button> */}
        <Button onClick={this.toggleDeleteChapterModal}>
          DELETE CHAPTER MODAL
        </Button>
        {/* <FootnoteModal
          toggleFootnoteModal={this.toggleFootnoteModal}
          show={this.state.footnoteModalActive}
        /> */}
        <ChapterDeleteModal
          chapter={this.props.currentChapter}
          toggleDeleteChapterModal={this.toggleDeleteChapterModal}
          show={this.state.deleteChapterModalActive}
        />

        <input
          className="w-100 text-center pv-4"
          name="title"
          value={this.state.chapterInEditor.title}
          onChange={this.handleChange}
        />

        <CKEditor
          editor={DecoupledEditor}
          data={this.props.currentChapter.body}
          onInit={editor => {
            editor.ui // manual addition of the toolbar
              .getEditableElement()
              .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
              );
          }}
          name="body"
          onChange={(event, editor) => {
            const data = editor.getData();
            this.handleChapterChange("body", data);
          }}
        />

        <div className="container-fluid">
          <div className="row">
            <Button
              bsPrefix="btn col custom-btn red-3 mx-2"
              onClick={this.saveChapter}
            >
              SAVE
            </Button>
          </div>
        </div>
      </>
    );
  }
}

// I want to get the currently selected chapter
const mapStateToProps = state => {
  return { currentChapter: state.user.currentChapter };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentChapterDispatch: chapterObj =>
      dispatch(setCurrentChapterDispatch(chapterObj)),
    patchChapter: chapterObj => dispatch(patchChapter(chapterObj)),
    updateUserChapterInStory: chapterObj =>
      dispatch(updateUserChapterInStory(chapterObj))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChapterTextEditor)
);
