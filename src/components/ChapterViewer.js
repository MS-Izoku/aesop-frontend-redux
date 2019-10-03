import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Pagination from "react-bootstrap/Pagination";
import ListGroup from "react-bootstrap/ListGroup";
class ChapterViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapter: { title: "Chapter Not Found", body: "Chapter Not Found" }
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
            <ListGroup.Item
            className="text-center eggshell"
              onClick={() => { this.renderChapter(chapter.chapter_index); }}
              key={chapter.id}
            >
              <div className="text-center">
                {chapter.title.length > 20
                  ? `${chapter.chapter_index}. ${chapter.title.substring(
                      0,
                      17
                    )}...`
                  : `${chapter.chapter_index}. ${chapter.title}`}
              </div>
            </ListGroup.Item>
          );
        });
  };

  renderChapter = chapterNumber => {
    chapterNumber = chapterNumber === undefined ? 1 : chapterNumber;
    if (this.props.currentStory.chapters !== undefined) {
      const temp = this.props.currentStory.chapters.filter(chapter => {
        return chapterNumber === chapter.chapter_index;
      });
      this.setState({ chapter: temp[0] });
    }
  };

  chapterView = () => {
    return this.state.chapter.body === "Chapter Not Found" ||
      this.state.chapter.body === "" ? (
      <div className="text-center stretchHeight px-3 pt-3 pb-3">
        {console.log(this.props)}
        {this.props.currentStory === undefined ? (
          <div>Select Chapter</div>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.currentStory.chapters[0].body
            }}
          />
        )}
      </div>
    ) : (
      <div className="stretchHeight px-3 pt-3 pb-3">
        <h3 className="text-center">{this.state.chapter.title}</h3>
        <hr />
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: this.state.chapter.body }}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="grey-dark row">
        <ListGroup className="col px-0">
        <div className="text-center">{this.renderList()}</div>
        </ListGroup>

        <div className="col-lg-8 px-0">
          <div id="reader-header" className="eggshell col">
            <p>{this.chapterView()}</p>
          </div>
        </div>
        <div className="col bg-danger" id="filler"></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { chapters: state.chapters };
};

export default withRouter(connect(mapStateToProps)(ChapterViewer));
