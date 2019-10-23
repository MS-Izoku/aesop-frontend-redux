import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import StoryForm from "../components/StoryForm";

class StoryManager extends Component {
  constructor() {
    super();
    this.state = {
      inEditor: false
    };
  }

  swapEditorState = () => {
    this.setState({ inEditor: !this.state.inEditor });
  };

  createChapterCards = () =>{
    if(this.props.currentStory.id !== undefined){
      return this.props.currentStory.chapters.map(chapter =>{
        return <div className="card">
          <h3>{chapter.title}</h3>
        </div>
      })
    }
  }
  render() {
    //debugger
    return (
      <div className="container-fluid">
        Story Manager ({this.props.currentStory.id})
        <div className="row">
          <div className="col"/>
          <div className="col">
            <StoryForm swapEditorState={this.swapEditorState} />
          </div>
          <div className="col"/>
        </div>
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

export default withRouter(connect(mapStateToProps)(StoryManager));
