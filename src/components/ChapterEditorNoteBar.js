import React, { Component } from "react";
import { connect } from "react-redux";

class ChapterEditorNoteBar extends Component {
  render() {
    return (
      <div className="col bg-info stretchHeight">
        <header>ChapterEditorNoteBar</header>
        {/* Character Features , footnote guide , etc */}
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
    // footnoes and character-inclusions will be managed here
    return state
}
export default connect(mapStateToProps)(ChapterEditorNoteBar)
