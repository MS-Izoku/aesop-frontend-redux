import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { getChapters } from "../actions/chapterActions";
import Button from "react-bootstrap/Button";

class ChapterEditorRT extends Component {

  saveChapter = () => {
    // patch the chapter to the DB
  };

  render() {
    //console.log(this.props);
    return (
      <div className="col-lg-8 stretchHeight">
        <Button onClick={this.saveChapter}>SAVE</Button>
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
            //console.log('====DATA====')
            //this.props.setCurrentChapterData(data)
            //console.log({ event, editor, data });
          }}
        />
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
