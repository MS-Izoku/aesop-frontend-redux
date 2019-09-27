import React, { Component } from "react";

import NavHeader from "../containers/NavHeader";
import CharacterForm from "../components/CharacterForm";
// import CharacterViewer from "../components/CharacterViewer";
// import CharacterIndex from "../components/CharacterIndex";
import { connect } from "react-redux";
import {withRouter} from 'react-router'
import {
  getCharacters,
  postCharacter,
  patchCharacter,
  deleteCharacter
} from "../actions/characterActions";

class CharacterManager extends Component {
  constructor() {
    super();
    this.state = {
      currentCharacter: {
        id: 0,
        name: "",
        height: 100,
        weight: 100,
        biography: "",
        personality: "",
        img_url: "",
        story_id: 0
      }
    };
  }

  setCurrentCharacter = charObj =>{
    this.setState({currentCharacter: charObj})
  }

  componentDidMount(){
   this.props.getCharacters(this.props.match.params.story_id)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <NavHeader />
        <CharacterForm currentCharacter={this.state.currentCharacter} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { characters: state.characters };
};

const mapDispatchToProps = dispatch => {
  return {
    getCharacters: (storyID) => dispatch(getCharacters(storyID)),
    postCharacter: () => dispatch(postCharacter()),
    patchCharacter: () => dispatch(patchCharacter()),
    deleteCharacter: () => dispatch(deleteCharacter())
  };
};
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterManager));
