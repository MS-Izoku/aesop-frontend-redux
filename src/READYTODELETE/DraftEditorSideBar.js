import React, { Component } from "react";
import EditorChapterNav from '../components/EditorChapterNav.js'
export default class DraftEditorSideBar extends Component {
  render() {
    return (
      <div id="navSideBar" className="bg-warning col-lg-2">
        <div className="container">
          <header>Top of the MainSideBar</header>
          <EditorChapterNav />
        </div>
      </div>
    );
  }
}
