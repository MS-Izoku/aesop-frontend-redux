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

class ChapterEditorSelect extends Component {
  getChaptersForList = () => {
    return this.props.chapters.map(chapter => {
      return (
        <ListGroup.Item
          key={chapter.id}
          onClick={()=>{
            this.handleSetCurrentChapter(chapter)
          }}
        >
          <NavLink to={`/chaptereditor/${chapter.id}`}>{chapter.title}</NavLink>
        </ListGroup.Item>
      );
    });
  };

  handleSetCurrentChapter = chapter => {
    const handler = this.props.setCurrentChapter;
    handler(chapter)
  };

  componentDidMount() {
    console.log(this.props);
    this.props.getChapters();
  }

  createChapter = () => {
    this.props.postChapter({}, this.props.storyID);
    console.log("Create Here...");
  };

  render() {
    //console.log(this.props);
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
    // setCurrentChapter: () => {
    //   dispatch(setCurrentChapter());
    // },
    getChapters: () => {
      dispatch(getChapters());
    },
    postChapter: () => {
      dispatch(postChapter({}));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChapterEditorSelect);
