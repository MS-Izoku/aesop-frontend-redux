import React, { Component } from "react";
import { withRouter } from "react-router";
import ChapterViewer from '../components/ChapterViewer'

import Button from "react-bootstrap/Button";
class StoryViewerGUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChapter: {
        title: "N/A",
        body: "N/A",
        chapter_index: 0,
        story_index: 0
      }
    };
  }

  selectNewChapter = () => {};

  render() {
    console.log(this.props);
    return (
      <div className="container-fluid">
        <Button onClick={this.props.switchEditorView}>SWITCH</Button>
        <h1>{this.props.currentStory.title}</h1>
        <p>Pitch: {this.props.currentStory.pitch}</p>
        <p>High Concept: {this.props.currentStory.high_concept}</p>
        <ChapterViewer currentStory={this.props.currentStory}/>

      </div>
    );
  }
}

export default withRouter(StoryViewerGUI);
