import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { getChapters, deleteChapter } from "../actions/chapterActions";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { HotKeys } from "react-hotkeys";

class ChapterEditorRT extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }

  handleTitleChange = event => {
    const titleChangeHandler = this.props.setCurrentChapterTitle;
    titleChangeHandler(event.target.value);
  };

  handleDeleteChapter = () => {
    console.log(this.props.currentChapter);
    this.props.deleteChapter(this.props.currentChapter);
  };

  render() {
    return (
      <div className="col-lg-8 stretchHeight">
        <Form
          onSubmit={event => {
            event.preventDefault();
            this.props.saveChapter()
          }}
        >
          <Form.Control
            id="chapter-title"
            onChange={event => {
              event.preventDefault();
              this.handleTitleChange(event);
            }}
            value={this.props.currentChapter.title}
          />
        </Form>
        <CKEditor
          editor={ClassicEditor}
          data={this.props.currentChapter.body} //this.props.chapter[0].body}
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            //console.log("Editor is ready to use!", editor);
            //this.setState({editor})
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.props.setCurrentChapterData(data);
            //console.log({ event, editor, data });
          }}
        />
        <button onClick={this.props.saveChapter}>SAVE</button>
        <button onClick={this.handleDeleteChapter}>DELETE</button>
      </div>
    );
  }
}

// I want to get the currently selected chapter
const mapStateToProps = state => {
  return { stories: state.stories, chapters: state.chapters };
};

const mapDispatchToProps = dispatch => {
  return {
    getChapters: storyID => dispatch(getChapters(storyID)),

    deleteChapter: chapter => dispatch(deleteChapter(chapter))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChapterEditorRT);
