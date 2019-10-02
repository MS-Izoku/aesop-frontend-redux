import React, { Component } from "react";

import NavHeader from "../containers/NavHeader";
import CharacterForm from "../components/CharacterForm";
import CharacterViewer from "../components/CharacterViewer";
// import CharacterIndex from "../components/CharacterIndex";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  getCharacter,
  postCharacter,
  patchCharacter,
  deleteCharacter
} from "../actions/characterActions";
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
    console.log(charObj);
    this.setState({ currentCharacter: charObj });
  };

  swapEditorState = () => {
    //console.log(this.state.currentCharacter);
    this.setState({ inEditor: !this.state.inEditor });
  };
  
  componentDidMount() {
    fetch(
      `http://localhost:3000/users/1/stories/${this.props.match.params.story_id}/characters/${this.props.match.params.character_id}`
    )
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        console.log(json);
        this.setState({ currentCharacter: json });
      });
    //this.props.getCharacter(this.props.match.params.story_id , this.props.match.params.character_id);
  }

  render() {
    console.log(this.props);
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
        <PageFooter/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { character: state.character };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     getCharacter: (storyID, characterID) =>
//       dispatch(getCharacter(storyID, characterID)),
//     postCharacter: () => dispatch(postCharacter()),
//     patchCharacter: () => dispatch(patchCharacter()),
//     deleteCharacter: () => dispatch(deleteCharacter())
//   };
// };
export default withRouter(
  connect(
    mapStateToProps
    // mapDispatchToProps
  )(CharacterManager)
);
