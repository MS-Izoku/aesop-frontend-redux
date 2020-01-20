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

import FootNoteModal from "../components/FootNoteModal.js";
import PageFooter from '../components/PageFooter'

class ChapterEditor extends Component {
  constructor() {
    super();
    this.state = {
      firstChapter: { id: 0, title: "N/A", body: "Chapter Data Not Found" },
      currentChapter: { id: 0, title: "N/A", body: "Chapter Data Not Found" },
      currentFootnote: { id: 0, title: "N/A", body: "N/A" },
      modalIsToggled: false
    };
  }

  toggleModal = () => {
    this.setState({ modalIsToggled: !this.state.modalIsToggled });
  };

  setCurrentFootNote = note => {
    console.log("Got here");
    this.setState({ currentFootnote: note });
  };

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
    console.log("Stories:", this.props);
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
    if (this.state.firstChapterInState !== this.props.chapters[0])
      this.setState({ firstChapter: this.props.chapters[0] });
    this.props.getChapters(this.props.match.params.story_id);
    this.setInitialChapter();
    console.log(this.props);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setCurrentChapterAfterDelete = () => {
    this.setState({
      firstChapter: this.props.chapters[0],
      currentChapter: this.props.chapters[0]
    });
  };

  //#region hotkeys
  keyMap = {
    saveChapterCMD: {
      name: "Save Chapter",
      sequence: "control+s",
      action: "keydown"
    }
  };

  // NYI
  keyMapHandler = {
    saveChapterCMD: () => {
      this.saveChapter();
    }
  };
  //#endregion

  render() {
    return (
      <div>
        <HotKeys keyMap={this.keyMap} handlers={this.keyMapHandler}>
          <NavHeader />
          <div className="container-fluid grey-light">
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
                firstChapterInState={this.state.firstChapter}
              />
              <RTEditorRightBar
                currentChapter={this.state.currentChapter}
                toggleModal={this.toggleModal}
                setCurrentFootnote={this.setCurrentFootNote}
              />
              <FootNoteModal
                toggleModal={this.toggleModal}
                modalIsToggled={this.state.modalIsToggled}
              />
            </div>
          </div>
        </HotKeys>
        <PageFooter />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { chapters: state.chapters, footnotes: state.footnotes };
};
const mapDispatchToProps = dispatch => {
  return {
    getChapters: storyID => dispatch(getChapters(storyID)),
    patchChapter: chapter => dispatch(patchChapter(chapter))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChapterEditor)
);
