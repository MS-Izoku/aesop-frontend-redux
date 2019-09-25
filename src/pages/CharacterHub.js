import React, { Component } from "react";
import NavHeader from "../containers/NavHeader";
import CharacterIndex from '../components/CharacterIndex'

class CharacterHub extends Component {
  render() {
    return (
      <div>
        <NavHeader />
        <CharacterIndex/>
      </div>
    );
  }
}

export default CharacterHub;
