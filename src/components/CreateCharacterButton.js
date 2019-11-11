import React from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { postCharacter } from "../actions/characterActions";

const CreateCharacterButton = props => {
    const newCharacterObj ={
        name: "New Character",
        author_id: props.user.id
    }
    return (
    <Button
      onClick={() => {
        props.postCharacter( newCharacterObj, props.story.id);
      }}
    >
      New Character
    </Button>
  );
};

const mapStateToProps = state => {
  return {
    story: state.user.currentStory,
    user: state.user.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postCharacter: (characterObj, storyID) =>
      dispatch(postCharacter(characterObj, storyID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCharacterButton);
