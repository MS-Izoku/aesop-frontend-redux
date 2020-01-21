import React, { Component } from "react";
import { connect } from "react-redux";

class ChapterEditorNoteBar extends Component {
  render() {
    return (
      <div className="col bg-info stretchHeight">
        <header>ChapterEditorNoteBar</header>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
    return state
}
export default connect(mapStateToProps)(ChapterEditorNoteBar)
