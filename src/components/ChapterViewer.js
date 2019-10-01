import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
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

  chapterView = () => {
    return this.state.chapter.body === "Chapter Not Found" ||
      this.state.chapter.body === "" ? (
      "Select Chapter"
    ) : (
      <div dangerouslySetInnerHTML={{ __html: this.state.chapter.body }} />
    );
  };
  render() {
    return (
      <div>
        <Button>Edit Chapter</Button>
        <Card id="chapter-viewer">
          <ButtonGroup id="chapter-list">{this.renderList()}</ButtonGroup>
          <div id="reader-header">
            <Card.Header className="text-center">
              <h2>
                {this.state.chapter.title === "Chapter Note Found"
                  ? "Select Chapter"
                  : this.state.chapter.title}
              </h2>
            </Card.Header>
          </div>
          <Card.Body>{this.chapterView()}</Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { chapters: state.chapters };
};

export default withRouter(connect(mapStateToProps)(ChapterViewer));
