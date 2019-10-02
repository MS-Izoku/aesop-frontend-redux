import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { getChapters, deleteChapter } from "../actions/chapterActions";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";
import Form from "react-bootstrap/Form";
import Nav from 'react-bootstrap/Nav'
import { HotKeys } from "react-hotkeys";

//import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

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
    this.props.deleteChapter(this.props.currentChapter);
    this.props.setCurrentChapterAfterDelete();
  };

  render() {
    return (
      <div className="col-lg-8 stretchHeight">
        <Form
          onSubmit={event => {
            event.preventDefault();
            this.props.saveChapter();
          }}
        >
          <Form.Control
            id="chapter-title"
            className="text-center border-none bg-tertiary"
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
        {/* <Nav.Link href={}> */}
        <Nav.Link href={`/chaptereditor/${this.props.match.params.story_id}/${this.props.firstChapterInState.id}`}>
          <Button
            onClick={() => {
              this.props.setCurrentChapterAfterDelete();
              this.handleDeleteChapter();
            }}
          >
            DELETE
          </Button>
        </Nav.Link>
        {/* </Nav> */}
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
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChapterEditorRT)
);
