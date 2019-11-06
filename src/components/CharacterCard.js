import React from "react";
import { setCurrentCharacterDispatch } from "../actions/userActions";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom'

const CharacterCard = props => {
  return (
    <div
      className="text-center mv-1 chapterCard onHoverDarken"
      onClick={() => {
        props.setCurrentCharacterDispatch(props.character);
        props.history.push("/charactermanager")
      }}
    >
      {props.character.name}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentCharacterDispatch: characterObj =>
      dispatch(setCurrentCharacterDispatch(characterObj))
  };
};
export default withRouter(connect(
  null,
  mapDispatchToProps
)(CharacterCard))
