import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { getChapters } from "../actions/chapterActions";
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

  render() {
    return (
      <div className="col-lg-8 stretchHeight">
        <Form>
          <Form.Control
            id="chapter-title"
            onChange={this.handleTitleChange}
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
            console.log("====DATA====");
            this.props.setCurrentChapterData(data);
            //console.log({ event, editor, data });
          }}
        />
        <button onClick={this.props.saveChapter}>SAVE</button>
      </div>
    );
  }
}

// I want to get the currently selected chapter
const mapStateToProps = state => {
  return { chapters: state.chapters };
};

const mapDispatchToProps = dispatch => {
  return {
    getChapters: () => dispatch(getChapters())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChapterEditorRT);
