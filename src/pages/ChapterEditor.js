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
    console.log("====RTE====");
    console.log(body);
    if (this.state !== undefined)
      this.setState({ currentChapter: { ...this.state.currentChapter, body } });
    //this.setState({currentChapter: {...this.state.currentChapter , body}})
  };

  componentDidMount() {
    this.props.getChapters();
    this.setInitialChapter();
  }

  setInitialChapter = () => {
    setTimeout(() => {
      this.setState({ currentChapter: this.props.chapters[0] });
      this.autoSave(120000);
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
    console.log("Saving...");
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
              setCurrentChapterTitle={this.setCurrentChapterTitle}
              saveChapter={this.saveChapter}
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
