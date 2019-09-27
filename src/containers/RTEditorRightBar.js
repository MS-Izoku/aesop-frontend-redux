import React, { Component } from "react";
import ChapterEditorFootNotebar from "../components/ChapterEditorFootNotebar";
import ChapterEditorCharacterbar from "../components/ChapterEditorCharacterbar";

class RTEditorRightBar extends Component {
  render() {
    return (
      <div className="col bg-info stretchHeight debugger">
        <ChapterEditorCharacterbar />
        <hr />
        <ChapterEditorFootNotebar currentChapter={this.props.currentChapter}/>
        <hr />
      </div>
    );
  }
}

export default RTEditorRightBar;
