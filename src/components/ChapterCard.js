import React from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router'
import { setCurrentChapterDispatch } from '../actions/userActions'

const ChapterCard = props => {
  return (
    <div
      key={props.chapter.id + 6650}
      className="card"
      onClick={() => {
        props.setCurrentChapterDispatch(props.chapter);
        props.history.push("/chaptereditor")
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

export default withRouter(connect(null , mapDispatchToProps)(ChapterCard));
