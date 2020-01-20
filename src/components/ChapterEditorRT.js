import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { getChapters, deleteChapter } from "../actions/chapterActions";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
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
            className="text-center bg-tertiary border-0 pt-1 pb-1"
            onChange={event => {
              event.preventDefault();
              this.handleTitleChange(event);
            }}
            value={this.props.currentChapter.title}
          />
        </Form>
        <CKEditor
        className="stretchHeight"
          editor={ClassicEditor}
          data={this.props.currentChapter.body}
          onInit={editor => {
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.props.setCurrentChapterData(data);
          }}
        />

        <div className="container-fluid">
          <div className="row">
            {" "}
            <Button bsPrefix="btn col custom-btn red-3 mx-2" onClick={this.props.saveChapter}>
              SAVE
            </Button>
            <Nav.Link
              href={`/chaptereditor/${this.props.match.params.story_id}/${this.props.firstChapterInState.id}`}
              className="col btn custom-btn red-3 mx-2"
              onClick={() => {
                this.props.setCurrentChapterAfterDelete();
                this.handleDeleteChapter();
              }}
            >
              DELETE
            </Nav.Link>
          </div>
        </div>
      </div>
    );
  }
}

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
