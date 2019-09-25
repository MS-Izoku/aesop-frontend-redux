import React, { Component } from "react";

export default class EditorFootnoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footnotes: ["Footnote!"]
    };
  }
  displayFootNotes = () => {
      return this.state.footnotes.map(note =>{
          return <li>{note}</li>
      })
  };
  render() {
    return (
      <div className="bg-warning m-1">
        <ul>{this.displayFootNotes()}</ul>
      </div>
    );
  }
}
