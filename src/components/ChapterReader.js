import React from "react";
import { connect } from "react-redux";
import DomPurify from 'dompurify'

const ChapterReader = props => {
  function htmlSetter(){
    return {__html: DomPurify.sanitize(props.chapter.body)}
  }
  return <div dangerouslySetInnerHTML={htmlSetter()}/>;
};

const mapStateToProps = state => {
  return { chapter: state.user.currentChapter };
};
export default connect(mapStateToProps)(ChapterReader);
