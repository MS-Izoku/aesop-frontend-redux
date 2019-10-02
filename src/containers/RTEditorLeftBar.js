import React, { Component } from "react";
import ChapterEditorSelect from "../components/ChapterEditorSelect";

export default class RTEditorLeftBar extends Component {
  render() {
    return (
      <div className="bg-primary-color stretchHeight">
        <ChapterEditorSelect storyID={this.props.storyID} setCurrentChapter={this.props.setCurrentChapter}/>
      </div>
    );
  }
}
