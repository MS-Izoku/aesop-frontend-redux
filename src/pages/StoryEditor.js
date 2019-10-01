import React, { Component } from "react";
import NavHeader from "../containers/NavHeader";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getStories, patchStory, deleteStory } from "../actions/storyActions";

import StoryEditorGUI from "../components/StoryEditorGUI";
import StoryViewerGUI from "../components/StoryViewerGUI";
import CharacterIndex from '../components/CharacterIndex'

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
    fetch(
      `http://localhost:3000/users/1/stories/${this.props.match.params.story_id}`
    )
      .then(resp => resp.json())
      .then(json => {
        console.log("FETCH_DATA", json);
        this.setState({ currentStory: json });
      });
  }

  saveStory = storyObj => {
    const newObj = Object.assign({}, storyObj, {
      id: parseInt(this.props.match.params.story_id)
    });
    this.props.patchStory(newObj);
    this.setState({ currentStory: newObj });
  };

  handleDelete = () => {
    this.props.deleteStory(this.props.match.params.story_id);
  };

  switchEditorView = () => {
    this.setState({ inEditor: !this.state.inEditor });
  };

  render() {
    return (
      <div>
        <NavHeader />
        {this.state.inEditor ? (
          <StoryEditorGUI
            currentStory={this.state.currentStory}
            saveStory={this.saveStory}
            handleDelete={this.handleDelete}
            switchEditorView={this.switchEditorView}
          />
        ) : (<div>
          <StoryViewerGUI
            currentStory={this.state.currentStory}
            switchEditorView={this.switchEditorView}
            currentStory={this.state.currentStory}
          />
          <CharacterIndex />
          </div>
        )}
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
