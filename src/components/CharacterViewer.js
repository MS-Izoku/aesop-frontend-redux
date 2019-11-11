import React, { Component } from "react";
import Button from "react-bootstrap/Button";
// get ONE character to view in this panel
// This panel should have an edit link that goes to the form

import Card from "react-bootstrap/Card";
class CharacterViewer extends Component {
  // testing a character for viewin

  render() {
    console.log(this.props.currentCharacter.weight);
    return (
      <div className="container-fluid eggshell">
        <Card className="row">
          <Card.Header className="eggshell">
            <h2 className="text-center">{this.props.currentCharacter.name}</h2>
          </Card.Header>
          <div className="text-center grey-dark col">
            <Card.Img
              className="characterCardAvatar eggshell"
              src={this.props.currentCharacter.img_url}
              alt="characterImg"
            />
          </div>
          <Button
            bsPrefix="btn custom-btn red-3 mt-2"
            onClick={this.props.swapEditorState}
          >
            Edit
          </Button>
        </Card>
        <hr />
        <div className="px-5">
          <h3 className="text-center">Appearance</h3>
          <h4 className="pt-3">Description</h4>
          <p>
            {this.props.currentCharacter.appearance !== ""
              ? this.props.currentCharacter.appearance
              : "Appearnce Not Found"}
          </p>
          <hr className="w-50" />
          <p>
            Height:{" "}
            {this.props.currentCharacter.height !== ""
              ? this.props.currentCharacter.height
              : "Height Not Found"}
          </p>
          <p>
            Weight:{" "}
            {this.props.currentCharacter.weight !== ""
              ? this.props.currentCharacter.weight
              : "Weight Not Found"}
          </p>
        </div>
        <hr />
        <div className="px-5">
          <h3 className="text-center">Personality and Backstory</h3>
          <hr className="w-50" />
          <h4 className="pt-3">Personality</h4>
          <p>
            {this.props.currentCharacter.personality !== ""
              ? this.props.currentCharacter.personality
              : "Personality Not Found"}
          </p>
          <h4 className="pt-3">Backstory</h4>
          <p>
            {this.props.currentCharacter.biography !== ""
              ? this.props.currentCharacter.biography
              : "Biography Not Found"}
          </p>
          <br/>
        </div>
      </div>
    );
  }
}

export default CharacterViewer;
