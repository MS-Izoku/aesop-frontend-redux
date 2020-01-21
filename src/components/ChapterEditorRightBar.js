import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setCurrentFootnote } from "../actions/footnoteActions";
import { setCurrentCharacterDispatch } from "../actions/userActions";
import CreateCharacterButton from "../components/CreateCharacterButton";
import CreateFootnoteButton from "./CreateFootnoteButton";

const ChapterEditorRightBar = props => {

  const handleCharacterClick = character =>{
    props.setCurrentCharacterDispatch(character)
    props.history.push("/charactermanager")
  }

  const createCharacterBar = () => {
    return (
      <div id="character-section">
        <CreateCharacterButton />
        {props.user.currentStory.characters &&
        props.user.currentStory.characters[0].id !== 0 ? (
          <div className="card">
            {props.user.currentStory.characters.map(char => {
              return (
                <div onClick={() => {
                  handleCharacterClick(char);
                }} className="card">
                  {char.name.substring(0, 20)}
                </div>
              );
            })}
          </div>
        ) : (
          <div>Characters Loading</div>
        )}
      </div>
    );
  };

  const handleFootnoteClick = note => {
    props.setCurrentFootnote(note);
    props.toggleFootnoteModal();
  };

  const createFootNoteBar = () => {
    return (
      <div id="footnote-section">
        {props.user.currentChapter.footnotes ? (
          <div className="card">
            <CreateFootnoteButton />
            {props.user.currentChapter.footnotes.map(note => {
              return (
                <div
                  className="card"
                  onClick={() => {
                    handleFootnoteClick(note);
                  }}
                >
                  <span>{note.body.substring(0, 10)}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="field-placeholder">Notes Loading</div>
        )}
      </div>
    );
  };
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
  return {
    setCurrentFootnote: footnoteObj =>
      dispatch(setCurrentFootnote(footnoteObj)),
    setCurrentCharacterDispatch: characterObj =>
      dispatch(setCurrentCharacterDispatch(characterObj , false , false))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChapterEditorRightBar)
);
