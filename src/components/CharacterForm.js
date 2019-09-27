import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import NumericInput from "react-numeric-input";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  getCharacters,
  postCharacter,
  patchCharacter,
  deleteCharacter
} from "../actions/characterActions";

class CharacterForm extends Component {
  weightFormat = num => num + " kg/lbs";
  heightFormat = num => num + " cm/in";

  // load in characer data from the currently selected character state

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    console.log("Handle Character submission here");
  };

  deleteCharacter = () => {
    console.log("Delete Here");
  };

  componentDidMount = () => {
   // console.log(this.props.match.params.story_id)
   // this.props.getCharacters(this.props.match.params.story_id);
  };

  render() {
    console.log(this.props);
    return (
      <div className="container-fluid">
        <h1>Character Creator</h1>
        <hr />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="character-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Character Name..."
              name="name"
              value={this.props.currentCharacter.name}
              onChange={this.handleChange}
            />
            <hr />
          </Form.Group>

          <Form.Group controlId="character-appearance">
            <h2>Character Appearance</h2>
            <Form.Label>Height</Form.Label>
            <NumericInput
              format={this.heightFormat}
              value={100}
              strict={true}
            />
            <br />
            <Form.Label>Weight</Form.Label>
            <NumericInput
              format={this.weightFormat}
              value={100}
              strict={true}
              name="weight"
            />
            <br />
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description of Appearance"
              name="appearance"
              rows={5}
            />
            <hr />
          </Form.Group>

          <Form.Group>
            <h2>Biography</h2>
            <Form.Control
              as="textarea"
              placeholder="Biography..."
              name="biography"
              rows={5}
            />
            <hr />
          </Form.Group>

          <Form.Group controlId="character-text">
            <h2>Personality and Backstory</h2>
            <Form.Label>Personality</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Personality..."
              rows={5}
              name="personality"
            />
            <hr />
            <Form.Label>Backstory</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Backstory..."
              rows={5}
              name="backstory"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>

          <Button variant="danger" type="submit" onClick={this.deleteCharacter}>
            DELETE
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { character: state.character };
};

const mapDispatchToProps = dispatch => {
  return {
    // getCharacters: (storyID) => dispatch(getCharacters(storyID)),
    // postCharacter: () => dispatch(postCharacter()),
    // patchCharacter: () => dispatch(patchCharacter()),
    // deleteCharacter: () => dispatch(deleteCharacter())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CharacterForm)
);
