import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getChapters } from "../actions/chapterActions";

import StoryForm from "../components/StoryForm";
import DeleteStoryButton from "../components/DeleteStoryButton";
import ChapterTextEditor from "../components/ChapterTextEditor";
import ChapterCard from "../components/ChapterCard";

class StoryManager extends Component {
  constructor() {
    super();
    this.state = {
      inEditor: false
    };
  }

  componentDidMount() {
    this.props.getChapters(this.props.currentStory.id);
  }

  swapEditorState = () => {
    this.setState({ inEditor: !this.state.inEditor });
  };

  createChapterCards = () => {
    if (this.props.currentStory.id !== undefined) {
      return this.props.currentStory.chapters
        .sort((chapA, chapB) => {
          return chapA.chapter_index - chapB.chapter_index;
        })
        .map(chapter => {
          return <ChapterCard chapter={chapter} key={chapter.id + 5412} />;
        });
    }
  };
  render() {
    return (
      <div className="container-fluid">
        Story Manager ({this.props.currentStory.id})
        <DeleteStoryButton />
        <div className="row">
          <div className="col" />
          <div className="col">
            <StoryForm swapEditorState={this.swapEditorState} />
          </div>
          <div className="col" />
        </div>
        {/* <div className="row bg-info" >
          <div className="col">
            <ChapterTextEditor />
          </div>
        </div> */}
        <div className="row">
          <div className="col">
            <h2>{this.props.currentStory.title}</h2>
            <p>{this.props.currentStory.pitch}</p>
            <p>{this.props.currentStory.high_concept}</p>
            {this.createChapterCards()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentStory: state.user.currentStory,
    stories: state.stories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChapters: storyID => dispatch(getChapters(storyID))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StoryManager)
);
