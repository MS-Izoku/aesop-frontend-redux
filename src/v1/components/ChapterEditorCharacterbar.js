import React, { Component } from "react";
import { connect } from "react-redux";
import { getCharacters , postCharacter } from "../actions/characterActions";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";

class ChapterEditorCharacterbar extends Component {
  componentDidMount() {
    this.props.getCharacters(this.props.match.params.story_id);
  }

  renderCharacters = () => {
    return this.props.characters.map(char => {
      return (
        <ListGroup.Item
          className="border-0 eggshell"
          key={char.id === undefined ? 0 : char.id}
        >
          <a
            className="red-3-text"
            href={`/cm/${this.props.match.params.story_id}/${char.id}`}
          >
            {char.name}
          </a>
        </ListGroup.Item>
      );
    });
  };

  tempCharacter = {
    name: "Character Name",
    height: 0,
    weight: 0,
    biography: "Biography Goes Here",
    personality: "",
    appearance: "",
    img_url: "",
    story_id: this.props.match.params.story_id
  };

  render() {
    return (
      <div>
        <ListGroup>
          {this.renderCharacters()}
          <Button
              bsPrefix="btn custom-btn red-3 eggshell-text"
              onClick={() => {
                this.props.postCharacter(
                  this.tempCharacter,
                  this.props.match.params.story_id
                );
              }}
            >
              Create Character
            </Button>
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { characters: state.characters };
};

const mapDispatchToProps = dispatch => {
  return {
    getCharacters: index => dispatch(getCharacters(index)),
    postCharacter: (charObj , storyID) => dispatch(postCharacter(charObj , storyID))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChapterEditorCharacterbar)
);
