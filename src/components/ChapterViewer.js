import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";

class ChapterViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapter: { title: "Chapter Note Found", body: "Chapter Not Found" }
    };
  }
  renderList = () => {
    if (this.props.currentStory.chapters !== undefined)
      return this.props.currentStory.chapters
        .sort((a, b) => {
          return a.chapter_index - b.chapter_index;
        })
        .map(chapter => {
          return (
            <Button
              onClick={() => {
                console.log(chapter);
                this.renderChapter(chapter.chapter_index);
              }}
              key={chapter.id}
            >
              {chapter.title}
            </Button>
          );
        });
  };

  renderChapter = chapterNumber => {
    chapterNumber = chapterNumber === undefined ? 1 : chapterNumber;
    //console.log("Looking for ", chapterNumber);
    if (this.props.currentStory.chapters !== undefined) {
      const temp = this.props.currentStory.chapters.filter(chapter => {
        //console.log(chapter);
        return chapterNumber === chapter.chapter_index;
      });
      //console.log("CHAPTER <<<", temp[0].body);
      this.setState({ chapter: temp[0] });
    }
  };

  render() {
    return (
      <div>
        <h1>VIEWER</h1>
        <div id="chapter-body">{this.state.chapter.body}</div>
        // this needs some html parsing
        <h2>LIST</h2>
        <div id="chapter-list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { chapters: state.chapters };
};

export default withRouter(connect(mapStateToProps)(ChapterViewer));
