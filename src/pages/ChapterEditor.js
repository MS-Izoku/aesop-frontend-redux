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

class ChapterEditor extends Component {
  constructor() {
    super();
    this.state = {
      currentChapter: { id: 0 , title: "N/A", body: "Chapter Data Not Found" }
    };
  }

  setCurrentChapter = chapter => {
    this.setState({ currentChapter: chapter });
  };

  setCurrentChapterData(body) {
    console.log(body)
    if(this.state !== undefined)
      this.setState({currentChapter: {...this.state.currentChapter , body}})

  }

  componentDidMount() {
    this.props.getChapters();
    this.setInitialChapter();
  }

  setInitialChapter = () => {
    setTimeout(() => {
      this.setState({ currentChapter: this.props.chapters[0] });
      this.autoSave(10000);
    }, 1000);
  };

  autoSave = time => {
    const patchHandler = this.props.patchChapter;

    this.interval = setInterval(() => {
      console.log(this.state.currentChapter.id);
      if (this.state.currentChapter.id !== 0)
        patchHandler(this.state.currentChapter);
      console.log("Saving...");
    }, time);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <NavHeader />
        <div className="container-fluid">
          <div className="row">
            <RTEditorLeftBar
              storyID={this.props.match.params.id}
              setCurrentChapter={this.setCurrentChapter}
            />
            <ChapterEditorRT
              currentChapter={this.state.currentChapter}
              setCurrentChapterData={this.setCurrentChapterData}
            />
            <RTEditorRightBar />
          </div>
        </div>
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
