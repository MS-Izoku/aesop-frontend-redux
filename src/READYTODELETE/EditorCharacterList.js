import React, { Component } from "react";

export default class EditorCharacterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: ["Character Name"]
    };
  }

  createCharacterLis = () => {
    return this.state.characters.map(char => {
      return <li>{char}</li>;
    });
  };

  render() {
    return (
      <div className="bg-white m-1">
        <ul>{this.createCharacterLis()}</ul>
      </div>
    );
  }
}
