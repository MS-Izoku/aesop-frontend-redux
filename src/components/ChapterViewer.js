import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Pagination from "react-bootstrap/Pagination";
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
            <Pagination.Item
              onClick={() => {
                console.log(chapter);
                this.renderChapter(chapter.chapter_index);
              }}
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
            </Pagination.Item>
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
        Select Chapter
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
      <div className="bg-dark row px-0">
        <Pagination id="chapter-list" className="col text-center w-100 px-2">
          <div>{this.renderList()}</div>
        </Pagination>

        <div className="col-lg-8">
          <div id="reader-header" className="bg-info col">
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
