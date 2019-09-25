import React, { Component } from "react";

export default class EditorChapterNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters: [{ title: "Title!", body: "Body!" }]
    }; // temp state for testing
  }

  renderChapters = () => {
    return this.state.chapters.map(chapter => {
      return <li className="list-group-item">{chapter.title}</li>;
    });
  };

  render() {
    return (
      <div className="text-center bg-white">
        <ul className="list-group">{this.renderChapters()}</ul>
        <button>New Chapter</button>

        
      </div>
    );
  }
}
