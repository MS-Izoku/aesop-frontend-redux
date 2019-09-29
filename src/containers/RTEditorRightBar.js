import React, { Component } from "react";
import ChapterEditorFootNotebar from "../components/ChapterEditorFootNotebar";
import ChapterEditorCharacterbar from "../components/ChapterEditorCharacterbar";

class RTEditorRightBar extends Component {

  render() {
    console.log(this.props)
    return (
      <div className="col bg-info stretchHeight debugger">
        <ChapterEditorCharacterbar />
        <hr />
        <ChapterEditorFootNotebar
          currentChapter={this.props.currentChapter}
          toggleModal={this.props.toggleModal}
          setCurrentFootnote={this.props.setCurrentFootnote}
        />
        <hr />
      </div>
    );
  }
}

export default RTEditorRightBar;
