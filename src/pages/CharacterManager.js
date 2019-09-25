import React, { Component } from "react";

import NavHeader from "../containers/NavHeader";
import CharacterForm from "../components/CharacterForm";
import CharacterViewer from "../components/CharacterViewer";
import CharacterIndex from '../components/CharacterIndex'

class CharacterManager extends Component {
  // get characters here



  render() {
    return (
      <div>
        <NavHeader />
        <CharacterForm/>
        {/* <CharacterViewer/> */}
      </div>
    );
  }
}
export default CharacterManager;
