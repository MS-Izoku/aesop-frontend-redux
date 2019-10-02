import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
class ChapterViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapter: { title: "Chapter Not Found", body: "Chapter Not Found" }
    };
  }
  // renderList = () => {
  //   if (this.props.currentStory.chapters !== undefined)
  //     return this.props.currentStory.chapters
  //       .sort((a, b) => {
  //         return a.chapter_index - b.chapter_index;
  //       })
  //       .map(chapter => {
  //         return (
  //           <Button
  //             onClick={() => {
  //               console.log(chapter);
  //               this.renderChapter(chapter.chapter_index);
  //             }}
  //             key={chapter.id}
  //           >
  //             {chapter.title}
  //           </Button>
  //         );
  //       });
  // };

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
              <div className="text-center">{chapter.title}</div>
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
      "Select Chapter"
    ) : (
      <div dangerouslySetInnerHTML={{ __html: this.state.chapter.body }} />
    );
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row px-0">
          <div className="col-lg-2 bg-danger">
            <Pagination id="chapter-list">
              <div>{this.renderList()}</div>
            </Pagination>
          </div>
          <div className="col-lg-10">
            <div id="reader-header" className="bg-info">
              <Card.Header className="text-center">
                <h2>
                  {this.state.chapter.title === "Chapter Not Found"
                    ? "Select Chapter"
                    : this.state.chapter.title}
                </h2>
              </Card.Header>
              <Card.Body>{this.chapterView()}</Card.Body>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { chapters: state.chapters };
};

export default withRouter(connect(mapStateToProps)(ChapterViewer));
