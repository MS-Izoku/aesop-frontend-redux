import React, { Component } from "react";
import ChapterEditorSelect from "../components/ChapterEditorSelect";

export default class RTEditorLeftBar extends Component {
  render() {
    return (
      <div className="eggshell stretchHeight">
        <ChapterEditorSelect storyID={this.props.storyID} setCurrentChapter={this.props.setCurrentChapter}/>
      </div>
    );
  }
}
