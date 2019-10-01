import React, { Component } from "react";
import Button from "react-bootstrap/Button";
// get ONE character to view in this panel
// This panel should have an edit link that goes to the form
class CharacterViewer extends Component {
  // testing a character for viewin
  render() {
    //console.log(this.props);
    return (
      <div className="container-fluid">
        <h2>{this.props.currentCharacter.name}</h2>
        <hr />
        <div>
          <h3>Appearance</h3>
          <p>Height: {this.props.currentCharacter.height}</p>
          <p>Weight: {this.props.currentCharacter.weight}</p>
          <h4>Description</h4>
          <p>{this.props.currentCharacter.appearance}</p>
        </div>
        <hr />
        <div>
          <h3>Personality and Backstory</h3>
          <h4>Personality</h4>
          <p>{this.props.currentCharacter.personality}</p>
          <h4>Backstory</h4>
          <p>{this.props.currentCharacter.biography}</p>
        </div>

        <Button onClick={this.props.swapEditorState}>Edit</Button>
      </div>
    );
  }
}

export default CharacterViewer;
