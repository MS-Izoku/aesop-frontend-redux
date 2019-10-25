import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";

import { setCurrentChapterDispatch , updateUserChapterInStory } from "../actions/userActions";
import { patchChapter } from "../actions/chapterActions";

import ChapterDeleteModal from "./ChapterDeleteModal";

class ChapterTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapterInEditor: {
        title: this.props.currentChapter.title,
        body: this.props.currentChapter.body
      }
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
    //console.log(configuredChapterObj);
    this.props.setCurrentChapterDispatch(configuredChapterObj);
    this.props.updateUserChapterInStory(configuredChapterObj)
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

  handleChange = event => {
    console.log(event.target.value , event.target.name , this.state.chapterInEditor.title)
    this.setState({
      chapterInEditor: {
        title: event.target.value
      }
    });
  };

  handleChapterChange = (eventName, data) => {
    this.setState({ chapterInEditor: { [eventName]: data } });
  };
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    //console.log("TEXT EDITOR PROPS:", this.props);
    return (
      <div className="col-lg-8 stretchHeight">
        <ChapterDeleteModal chapter={this.props.currentChapter} />
        
          <input
            name="title"
            value={this.props.currentChapter.title}
            onChange={this.handleChange}
          />
     
        <CKEditor
          className="stretchHeight"
          editor={ClassicEditor}
          data={this.props.currentChapter.body} //this.props.chapter[0].body}
          onInit={editor => {}}
          name="body"
          onChange={(event, editor) => {
            const data = editor.getData();
            this.handleChapterChange("body", data);
          }}
        />

        <div className="container-fluid">
          <div className="row">
            {" "}
            <Button
              bsPrefix="btn col custom-btn red-3 mx-2"
              onClick={this.saveChapter}
            >
              SAVE
            </Button>
          </div>
        </div>

        <div id="Debug-Viewer">
          <h2>{this.props.currentChapter.title}</h2>
          <p>{this.props.currentChapter.body}</p></div>
      </div>
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
    updateUserChapterInStory: chapterObj => dispatch(updateUserChapterInStory(chapterObj))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChapterTextEditor)
);
