import React, { Component } from "react";

import NavHeader from "../containers/NavHeader";
import CharacterForm from "../components/CharacterForm";
import CharacterViewer from "../components/CharacterViewer";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getCharacters } from "../actions/characterActions";
import PageFooter from "../components/PageFooter";

class CharacterManager extends Component {
  constructor() {
    super();
    this.state = {
      inEditor: false,
      currentCharacter: {
        id: 0,
        name: "",
        height: 100,
        weight: 100,
        biography: "",
        personality: "",
        appearance: "",
        img_url: "",
        story_id: 0
      }
    };
  }

  setCurrentCharacter = charObj => {
    this.setState({ currentCharacter: charObj });
  };

  swapEditorState = () => {
    this.setState({ inEditor: !this.state.inEditor });
  };

  componentDidMount() {
    this.props.getCharacters(this.props.match.params.story_id);
    fetch(
      `https://aesop-backend.herokuapp.com//users/1/stories/${this.props.match.params.story_id}/characters/${this.props.match.params.character_id}`
    )
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        console.log(json);
        this.setState({ currentCharacter: json });
      });
  }

  render() {
    return (
      <div>
        <NavHeader />
        {this.state.inEditor ? (
          <CharacterForm
            currentCharacter={this.state.currentCharacter}
            setCurrentCharacter={this.setCurrentCharacter}
            swapEditorState={this.swapEditorState}
          />
        ) : (
          <CharacterViewer
            currentCharacter={this.state.currentCharacter}
            swapEditorState={this.swapEditorState}
          />
        )}
        <PageFooter />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { character: state.character };
};

const mapDispatchToProps = dispatch => {
  return {
    getCharacters: storyID => dispatch(getCharacters(storyID))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CharacterManager)
);
