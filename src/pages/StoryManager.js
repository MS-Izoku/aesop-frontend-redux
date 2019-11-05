import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getChapters } from "../actions/chapterActions";

import StoryForm from "../components/StoryForm";
import DeleteStoryButton from "../components/DeleteStoryButton";
import ChapterReader from "../components/ChapterReader";
import ChapterCard from "../components/ChapterCard";
import GoToChapterEditorButton from "../components/GoToChapterEditorButton";

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
          <div className="col-lg-9 text-center">
            <StoryForm swapEditorState={this.swapEditorState} />
            <h2>{this.props.currentStory.title}</h2>
          </div>
          <div className="col" />
        </div>
        <div className="row" >
        <div className="col">
            {this.createChapterCards()}
          </div>
          <div className="col-lg-8">
            <GoToChapterEditorButton />
            <ChapterReader />
          </div>
          <div className="col" />
        </div>
        <div className="row">

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentStory: state.user.currentStory,
    stories: state.stories,
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
