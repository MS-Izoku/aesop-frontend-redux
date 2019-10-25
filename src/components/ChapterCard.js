import React from "react";
import { connect } from "react-redux";
import { setCurrentChapterDispatch } from '../actions/userActions'

const ChapterCard = props => {
  return (
    <div
      key={props.chapter.id + 6650}
      className="card"
      onClick={() => {
        props.setCurrentChapterDispatch(props.chapter);
      }}
    >
      <h3>{props.chapter.title}</h3>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentChapterDispatch: chapterObj =>
      dispatch(setCurrentChapterDispatch(chapterObj))
  };
};

export default connect(null , mapDispatchToProps)(ChapterCard);
