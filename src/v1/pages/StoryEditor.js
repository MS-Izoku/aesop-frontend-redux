import React, { Component } from "react";
import NavHeader from "../containers/NavHeader";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getStories, patchStory, deleteStory } from "../actions/storyActions";

import ChapterViewer from "../components/ChapterViewer";
import StoryEditorGUI from "../components/StoryEditorGUI";
import StoryViewerGUI from "../components/StoryViewerGUI";
import CharacterIndex from "../components/CharacterIndex";
import PageFooter from "../components/PageFooter";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//import AccordionToggle from "react-bootstrap/AccordionToggle";

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
        chapters: [{title: "Chapter Not Found" , body:"Chapter Not Found"}]
      }
    };
  }

  // componentDidMount() {
  //   fetch(
  //     `http://localhost:3000/users/1/stories/${this.props.match.params.story_id}`
  //   )
  //     .then(resp => resp.json())
  //     .then(json => {
  //       console.log("SETTING CURRENT STORY DATA", json);
  //       this.setState({ currentStory: json });
  //     });
  // }

  saveStory = storyObj => {
    const newObj = Object.assign({}, this.state.currentStory, {
      high_concept: storyObj.high_concept,
      pitch: storyObj.pitch,
      title: storyObj.title,
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
    const arrowIcon =
      "https://img.icons8.com/ios-glyphs/30/000000/collapse-arrow.png";
    return (
      <div>
        <NavHeader />
        {this.state.inEditor ? (
          <div>
            <Button
              bsPrefix="btn custom-btn btn-block red-2 eggshell-text"
              onClick={this.switchEditorView}
            >
              {this.state.inEditor ? "View Story" : "Edit Story"}
            </Button>
            <StoryEditorGUI
              currentStory={this.state.currentStory}
              saveStory={this.saveStory}
              handleDelete={this.handleDelete}
              switchEditorView={this.switchEditorView}
            />
          </div>
        ) : (
          <div>
            <Button
              bsPrefix="btn custom-btn btn-block red-2 eggshell-text"
              onClick={this.switchEditorView}
            >
              {this.state.inEditor ? "View Story" : "Edit Story"}
            </Button>
            <StoryViewerGUI
              currentStory={this.state.currentStory}
              switchEditorView={this.switchEditorView}
              currentStory={this.state.currentStory}
            />
            <Accordion defaultActiveKey="1" className="grey-dark">
              <Card className="border-0">
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="1" className="eggshell-dark">
                  <h2 className="text-center">
                    <span>
                      <img src={arrowIcon} className="accordionIcon" />
                    </span>{" "}
                    Story Viewer{" "}
                    <span>
                      <img src={arrowIcon} className="accordionIcon" />
                    </span>
                  </h2>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="1">
                  <ChapterViewer //currentStory={this.props.currentStory}/>
                    currentStory={this.state.currentStory}
                    switchEditorView={this.switchEditorView}
                    currentStory={this.state.currentStory}
                  />
                </Accordion.Collapse>
              </Card>

              <Card className="border-0">
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" className="eggshell-dark">
                  <h2 className="text-center">
                    <span>
                      <img src={arrowIcon} className="accordionIcon" />
                    </span>{" "}
                    Characters{" "}
                    <span>
                      <img src={arrowIcon} className="accordionIcon" />
                    </span>
                  </h2>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="0" className="eggshell">
                  <CharacterIndex />
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        )}
        <PageFooter />
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
