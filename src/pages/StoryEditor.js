import React, { Component } from "react";
import NavHeader from "../containers/NavHeader";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getStories, patchStory, deleteStory } from "../actions/storyActions";

import StoryEditorGUI from "../components/StoryEditorGUI";

class StoryEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inEditor: false,
      currentStory: {
        id: 0,
        title: "IAMA",
        high_concept: "",
        pitch: "",
        user_id: 1
      }
    };
  }

  componentDidMount() {
    console.log(
      `http://localhost:3000/users/1/stories/${this.props.match.params.story_id}`
    );
    fetch(
      `http://localhost:3000/users/1/stories/${this.props.match.params.story_id}`
    )
      .then(resp => resp.json())
      .then(json => {
        console.log("FETCH_DATA", json);
        this.setState({ currentStory: json });
      });
  }

  renderStoryInformation = () => {
    return <div></div>;
  };

  saveStory = storyObj => {
    const newObj = Object.assign({}, storyObj, {
      id: parseInt(this.props.match.params.story_id)
    });
    console.log(newObj);
    this.props.patchStory(newObj);
  };

  handleDelete = () => {
    this.props.deleteStory(this.props.match.params.story_id);
  };

  render() {
    //debugger;
    console.log("STATE CHANGE", this.state);
    return (
      <div>
        <NavHeader />
        {/* <StoryEditorGUI
          currentStory={this.state.currentStory}
          setCurrentStory={this.setCurrentStory}
        /> */}
        <StoryEditorGUI
          currentStory={this.state.currentStory}
          saveStory={this.saveStory}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stories: state.stories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStories: () => dispatch(getStories()),
    patchStory: story => dispatch(patchStory(story)),
    deleteStory: () => dispatch(deleteStory())
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StoryEditor)
);
