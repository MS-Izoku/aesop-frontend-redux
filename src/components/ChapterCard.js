import React from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router'
import { setCurrentChapterDispatch } from '../actions/userActions'

const ChapterCard = props => {
  console.log(props)
  return (
    <div
      key={props.chapter.id + 6650}
      className="text-center mv-1 chapterCard onHoverDarken"
      onClick={() => {
        props.setCurrentChapterDispatch(props.chapter);

        if(props.history.location.pathname !== "/chaptereditor")
          props.history.push("/chaptereditor")
      }}
    >
      {props.chapter.title}
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
