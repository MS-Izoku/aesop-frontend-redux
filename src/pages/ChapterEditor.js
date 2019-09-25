import React, { Component } from "react";
//import ChapterEditorSelect from "../ChapterEditorSelect";
import ChapterEditorRT from "../components/ChapterEditorRT";
//import ChapterEditorNotebar from "../ChapterEditorCharacterbar.js/ChapterEditorNoteBar";
import RTEditorLeftBar from "../containers/RTEditorLeftBar.js";
import RTEditorRightBar from "../containers/RTEditorRightBar";
import NavHeader from "../containers/NavHeader";


import {withRouter} from 'react-router'

class ChapterEditor extends Component {
  render() {
    return (
      <div>
        <NavHeader />
        <div className="container-fluid">
          <div className="row">
            <RTEditorLeftBar storyID={this.props.match.params.id}/>
            <ChapterEditorRT />
            <RTEditorRightBar />
            {/* <ChapterEditorNotebar /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ChapterEditor);
