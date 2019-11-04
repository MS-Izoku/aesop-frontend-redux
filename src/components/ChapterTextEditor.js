import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
      chapterInEditor: {
        title: props.currentChapter.title,
        body: this.props.currentChapter.body
      },
      chapterID: this.props.currentChapter.id
    };
  }

  // need to get the editorstate here and configure the object to save properly
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

  handleChange = event => {
    console.log(
      event.target.value,
      event.target.name,
      this.state.chapterInEditor.title
    );
    this.setState({
      chapterInEditor: {
        ...this.state.chapterInEditor,
        title: event.target.value
      }
    });
  };

  handleChapterChange = (eventName, data) => {
    this.setState({
      chapterInEditor: { ...this.state.chapterInEditor, [eventName]: data }
    });
  };

  render() {
    return (
      <>
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
        {/* <ChapterDeleteModal chapter={this.props.currentChapter} /> */}
        {/* <FootnoteModal /> */}
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
