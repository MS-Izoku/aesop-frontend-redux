import React from "react";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentStory } from "../actions/storyActions";
import { setCurrentChapter } from "../actions/chapterActions";

const StoryShowCard = props => {
  return (
    <div className="text-center card">
      <h3>{props.story.title}</h3>
      <p>{props.story.pitch}</p>
      <Button
        onClick={() => {
          props.setCurrentStory(props.story);
          props.setCurrentChapter(props.story.chapters.sort((chapA , chapB) =>{
            return chapB.chapter_index - chapA.chapter_index
          })[0])  // improve this with more-specific backend functionality: {chapters: last_visited_chapter}
          props.history.push(`/storyManager/`);
        }}
      >
        Go To
      </Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentStory: storyObj => dispatch(setCurrentStory(storyObj)),
    setCurrentChapter: chapterObj => dispatch(setCurrentChapter(chapterObj))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(StoryShowCard)
);
