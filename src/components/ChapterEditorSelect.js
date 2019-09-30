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
            key={chapter.id}
            onClick={() => {
              this.handleSetCurrentChapter(chapter);
            }}
          >
            <NavLink
              to={`/chaptereditor/${this.props.match.params.story_id}/${chapter.id}`}
            >
              {chapter.title}
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
      <div>
        <ListGroup.Item>
          <Button onClick={this.createChapter}>Create New Chapter</Button>
        </ListGroup.Item>
        <ListGroup>{this.getChaptersForList()}</ListGroup>
        <hr />
      </div>
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
