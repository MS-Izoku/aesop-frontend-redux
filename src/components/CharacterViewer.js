import React, { Component } from "react";

// get ONE character to view in this panel
// This panel should have an edit link that goes to the form
class CharacterViewer extends Component {
    // testing a character for viewing
  character = {
    name: "Speedwagon",
    height: 120,
    weight: 150,
    personality: "Great, specially great, the best",
    backstory: "Ogre Street is a harsh mistress...",
    appearance: "One handsome son of a bitch"
  };

  render() {
    return (
      <div className="container-fluid">
        <h2>{this.character.name}</h2>
        <hr/>
        <div>
            <h3>Appearance</h3>
            <p>Height: {this.character.height}</p>
            <p>Weight: {this.character.weight}</p>
            <h4>Description</h4>
            <p>{this.character.appearance}</p>
        </div>
        <hr/>
        <div>
            <h3>Personality and Backstory</h3>
            <h4>Personality</h4>
            <p>{this.character.personality}</p>
            <h4>Backstory</h4>
            <p>{this.character.backstory}</p>
        </div>


      </div>
    );
  }
}

export default CharacterViewer;
