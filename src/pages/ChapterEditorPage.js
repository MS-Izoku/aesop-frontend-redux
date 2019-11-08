import React, { Component } from "react";
import { connect } from "react-redux";

import ChapterTextEditor from "../components/ChapterTextEditor";
import ChapterEditorRightBar from "../components/ChapterEditorRightBar";
import FootnoteModal from "../components/FootnoteModal";

import ChapterCard from "../components/ChapterCard";
class ChapterEditorPage extends Component {
  constructor() {
    super();
    this.state = {
      footnoteModalActive: false
    };
  }
  createChapterCards = () => {
    if (this.props.currentStory.id !== undefined) {
      return this.props.currentStory.chapters
        .sort((chapA, chapB) => {
          return chapA.chapter_index - chapB.chapter_index;
        })
        .map(chapter => {
          return <ChapterCard chapter={chapter} key={chapter.id + 5412} />;
        });
    }
  };

  toggleFootnoteModal = () => {
    this.setState({ footnoteModalActive: !this.state.footnoteModalActive });
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleFootnoteModal}>FOOTNOTE MODAL</button>
        <FootnoteModal show={this.state.footnoteModalActive} toggleFootnoteModal={this.toggleFootnoteModal}/>
        <div className="row">
          <div
            id="chapter-editor-select"
            className="col chapterScrollBar overflow-scroll text-center"
          >
            {this.createChapterCards()}
          </div>
          <div className="col-lg-9 col-sm-12 bg-info px-0 mx-0">
            <ChapterTextEditor />
          </div>
          <div className="col">
            <ChapterEditorRightBar 
            toggleFootnoteModal={this.toggleFootnoteModal}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { currentStory: state.user.currentStory };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChapterEditorPage);
