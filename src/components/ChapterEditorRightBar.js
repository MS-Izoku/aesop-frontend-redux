import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const ChapterEditorRightBar = props => {
  const createCharacterBar = () => {
    return (
      <div id="character-section">
          {" Create Character Button! "}
        {props.user.currentStory.characters &&
        props.user.currentStory.characters[0].id !== 0 ? (
          <div className="card">
            {props.user.currentStory.characters.map(char => {
              return <div className="card">{char.name.substring(0 , 20)}</div>;
            })}
          </div>
        ) : (
          <div>No Chars found</div>
        )}
      </div>
    );
  };

  const createFootNoteBar = () => {
    return (
      <div id="footnte-section">
        {props.user.currentChapter.footnotes ? (
          <div className="card">
              {" Create Note Button! "}
            {props.user.currentChapter.footnotes.map(note => {
              return <div className="card"><span>{note.body.substring(0 , 10)}</span></div>;
            })}
          </div>
        ) : (
          <div>Notes Not Found</div>
        )}
      </div>
    );
  };

  console.log(props);
  return (
    <div id="chapter-editor-management">
      {createCharacterBar()}
      {createFootNoteBar()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChapterEditorRightBar)
);