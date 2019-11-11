import React, { Component } from "react";
import { connect } from "react-redux";
import {
  // setCurrentChapter,
  getChapters,
  postChapter
} from "../actions/chapterActions";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

class ChapterEditorSelect extends Component {
  getChaptersForList = () => {
    return this.props.chapters
      .sort((a, b) => {
        return a.chapter_index - b.chapter_index;
      })
      .map(chapter => {
        return (
          <ListGroup.Item
            className="text-center eggshell border-0"
            key={chapter.id}
            onClick={() => {
              this.handleSetCurrentChapter(chapter);
            }}
          >
            <NavLink
              className="text-center red-3-text"
              to={`/chaptereditor/${this.props.match.params.story_id}/${chapter.id}`}
            >
              {chapter.title.length > 20
                ? `${chapter.chapter_index}. ${chapter.title.substring(
                    0,
                    20
                  )}...`
                : chapter.title !== 'Preface' ? `${chapter.chapter_index}. ${chapter.title}` : 'Preface'}
            </NavLink>
          </ListGroup.Item>
        );
      });
  };

  handleSetCurrentChapter = chapter => {
    const handler = this.props.setCurrentChapter;
    handler(chapter);
  };

  componentDidMount() {
    this.props.getChapters();
  }

  createChapter = () => {
    this.props.postChapter(this.props.match.params.story_id);
  };

  render() {
    return (
      <ListGroup className="eggshell">
        <ListGroup.Item className="eggshell text-center border-0 overflow-scroll">
          <Button
            onClick={this.createChapter}
            bsPrefix="btn btn-block custom-btn mx-0 red-3"
          >
            Create New Chapter
          </Button>
        </ListGroup.Item>
        <ListGroup>{this.getChaptersForList()}</ListGroup>
        <hr />
      </ListGroup>
    );
  }
}

const mapStateToProps = state => {
  return { chapters: state.chapters };
};

const mapDispatchToProps = dispatch => {
  return {
    getChapters: () => {
      dispatch(getChapters());
    },
    postChapter: storyID => {
      dispatch(postChapter(storyID));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChapterEditorSelect)
);
