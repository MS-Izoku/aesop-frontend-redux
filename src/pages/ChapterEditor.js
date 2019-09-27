import React, { Component } from "react";
//import ChapterEditorSelect from "../ChapterEditorSelect";
import ChapterEditorRT from "../components/ChapterEditorRT";
//import ChapterEditorNotebar from "../ChapterEditorCharacterbar.js/ChapterEditorNoteBar";
import RTEditorLeftBar from "../containers/RTEditorLeftBar.js";
import RTEditorRightBar from "../containers/RTEditorRightBar";
import NavHeader from "../containers/NavHeader";
import { connect } from "react-redux";

import { getChapters, patchChapter } from "../actions/chapterActions";

import { withRouter } from "react-router";
import { HotKeys } from "react-hotkeys";

class ChapterEditor extends Component {
  constructor() {
    super();
    this.state = {
      currentChapter: { id: 0, title: "N/A", body: "Chapter Data Not Found" }
    };
  }

  setCurrentChapter = chapter => {
    this.setState({ currentChapter: chapter });
  };

  setCurrentChapterTitle = title => {
    this.setState({ currentChapter: { ...this.state.currentChapter, title } });
  };
  setCurrentChapterData = body => {
    if (this.state !== undefined)
      this.setState({ currentChapter: { ...this.state.currentChapter, body } });
  };

  setInitialChapter = () => {
    setTimeout(() => {
      this.setState({ currentChapter: this.props.chapters[0] });
      this.autoSave(30000);
    }, 1000);
  };

  autoSave = time => {
    this.interval = setInterval(() => {
      this.saveChapter();
    }, time);
  };

  saveChapter = () => {
    const patchHandler = this.props.patchChapter;
    if (this.state.currentChapter.id !== 0)
      patchHandler(this.state.currentChapter);
  };

  componentDidMount() {
    this.props.getChapters();
    this.setInitialChapter();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setCurrentChapterAfterDelete = () =>{
    // I need to get the chapterIndex working in the seeds to get them working at this point
    switch(this.state.currentChapter.chapter_index){
      case undefined:
        // redirect to the story hub here
        return
      case 1:
        // redirect to the story hub here
        return
      default:
        // go to the previous-chapter based on the index 
        return
    }
  }
  //#region hotkeys
  keyMap = {
    saveChapterCMD: {
      name: "Save Chapter",
      sequence: "control+s",
      action: "keydown"
    }
  };

  keyMapHandler = {
    saveChapterCMD: () => {
      this.saveChapter();
      console.log("SAVING WITH HOTKEY");
    }
  };
  //#endregion

  render() {
    return (
      <div>
        <HotKeys keyMap={this.keyMap} handlers={this.keyMapHandler}>
          <NavHeader />
          <div className="container-fluid">
            <div className="row">
              <RTEditorLeftBar
                storyID={this.props.match.params.story_id}
                setCurrentChapter={this.setCurrentChapter}
              />
              <ChapterEditorRT
                currentChapter={this.state.currentChapter}
                setCurrentChapterData={this.setCurrentChapterData}
                setCurrentChapterTitle={this.setCurrentChapterTitle}
                saveChapter={this.saveChapter}
                setCurrentChapterAfterDelete={this.setCurrentChapterAfterDelete}
              />
              <RTEditorRightBar currentChapter={this.state.currentChapter}/>
            </div>
          </div>
        </HotKeys>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { chapters: state.chapters };
};
const mapDispatchToProps = dispatch => {
  return {
    getChapters: () => dispatch(getChapters()),
    patchChapter: chapter => dispatch(patchChapter(chapter))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChapterEditor)
);
