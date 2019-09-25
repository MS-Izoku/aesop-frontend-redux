import React, { Component } from "react";
import ChapterEditorSelect from "../components/ChapterEditorSelect";

export default class RTEditorLeftBar extends Component {
  render() {
    return (
      <div className="col bg-warning">
        <ChapterEditorSelect storyID={this.props.storyID}/>
      </div>
    );
  }
}
