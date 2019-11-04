import React from "react";
import { connect } from "react-redux";

const ChapterReader = props => {
  return <div>{props.chapter.body}</div>;
};

const mapStateToProps = state => {
  return { chapter: state.user.currentChapter };
};
export default connect(mapStateToProps)(ChapterReader);
