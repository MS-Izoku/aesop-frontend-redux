import React, { Component } from "react";
import NavHeader from "../containers/NavHeader";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getStories, patchStory, deleteStory } from "../actions/storyActions";

import StoryEditorGUI from "../components/StoryEditorGUI";
import StoryViewerGUI from "../components/StoryViewerGUI";
import CharacterIndex from "../components/CharacterIndex";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AccordionToggle from "react-bootstrap/AccordionToggle";

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
        user_id: 1,
        chapters:[]
      }
    };
  }

  componentDidMount() {
    fetch(
      `http://localhost:3000/users/1/stories/${this.props.match.params.story_id}`
    )
      .then(resp => resp.json())
      .then(json => {
        console.log("SETTING CURRENT STORY DATA", json);
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
        ) : (
          <div>
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                  <h2 className="text-center">Characters</h2>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="0">
                  <CharacterIndex />
                </Accordion.Collapse>
              </Card>

              <Card>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                  <h2 className="text-center">Story Viewer</h2>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <StoryViewerGUI
                    currentStory={this.state.currentStory}
                    switchEditorView={this.switchEditorView}
                    currentStory={this.state.currentStory}
                  />
                </Accordion.Collapse>
              </Card>
            </Accordion>
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
