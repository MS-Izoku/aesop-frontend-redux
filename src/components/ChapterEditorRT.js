import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { getChapters } from "../actions/chapterActions";
import Button from "react-bootstrap/Button";

class ChapterEditorRT extends Component {
  constructor() {
    super();
    this.state = {
      chapter: { title: "No Title Found", body: "Body Goes here" },
      chapters: {}
    };
  }
  componentDidMount() {
    //this.props.getChapters();
    this.getChapter();
  }

  getChapter = () => {
    fetch("http://localhost:3000/users/1/stories/1/chapters/11/")
      .then(resp => resp.json())
      .then(json => {
        this.setState({ chapter: json });
        console.log("========");
        console.log(json);
      });
  };

  saveChapter = () => {
    // patch the chapter to the DB
  };

  render() {
    // debugger
    console.log(this.props);
    return (
      <div className="col-lg-8 stretchHeight">
        <Button onClick={this.saveChapter}>SAVE</Button>
        <CKEditor
          editor={ClassicEditor}
          data={this.state.chapter.body} //this.props.chapter[0].body}
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
        />
      </div>
    );
  }
}

// I want to get the currently selected chapter
const mapStateToProps = state => {
  return { chapter: state.chapter };
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
