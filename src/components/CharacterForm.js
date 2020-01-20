import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import NumericInput from "react-numeric-input";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { patchCharacter } from "../actions/characterActions";

class CharacterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCharacter: {
        name: "",
        height: 100,
        weight: 100,
        biography: "",
        personality: "",
        appearance: "",
        img_url: ""
      }
    };
  }

  weightFormat = num => num + " kg/lbs";
  heightFormat = num => num + " cm/in";

  handleChange = event => {
    this.setState({
      currentCharacter: {
        ...this.state.currentCharacter,
        [event.target.name]: event.target.value
      }
    });
  };

  handleHeightChange = val => {
    this.setState({
      currentCharacter: { ...this.state.currentCharacter, height: val }
    });
  };

  handleWeightChange = val => {
    this.setState({
      currentCharacter: { ...this.state.currentCharacter, weight: val }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.setCurrentCharacter(this.state.currentCharacter);
    this.props.patchCharacter(this.state.currentCharacter);
    this.props.swapEditorState();
  };

  componentDidMount = () => {
    this.setState({ currentCharacter: this.props.currentCharacter });
  };

  render() {
    return (
      <div className="container-fluid eggshell px-5 pt-3 pb-3">
        <h1>Character Creator</h1>
        <hr />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="character-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Character Name..."
              name="name"
              value={this.state.currentCharacter.name}
              onChange={this.handleChange}
            />
            <hr />
          </Form.Group>

          <Form.Group controlId="character-appearance">
            <h2>Character Appearance</h2>
            <Form.Label>Height</Form.Label>{"  "}
            <NumericInput
              format={this.heightFormat}
              value={this.state.currentCharacter.height}
              strict={true}
              name="height"
              onChange={this.handleHeightChange}
            />
            <br />
            <Form.Label>Weight</Form.Label>{"  "}
            <NumericInput
              format={this.weightFormat}
              value={this.state.currentCharacter.weight}
              strict={true}
              name="weight"
              onChange={this.handleWeightChange}
            />
            <br />
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Appearance..."
              value={this.state.currentCharacter.appearance}
              name="appearance"
              rows={5}
              onChange={this.handleChange}
            />
            <hr />
          </Form.Group>

          <Form.Group>
            <h2>Biography</h2>
            <Form.Control
              as="textarea"
              placeholder="Biography..."
              value={this.state.currentCharacter.biography}
              name="biography"
              rows={5}
              onChange={this.handleChange}
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
              value={this.state.currentCharacter.personality}
              onChange={this.handleChange}
            />
            <hr />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image Url</Form.Label>
            <Form.Control
              type="text"
              placeholder="http://..."
              name="img_url"
              value={this.props.currentCharacter.img_url}
              onChange={this.handleChange}
            ></Form.Control>
          </Form.Group>

          <ButtonGroup className="stretchWidth pb-3">
            <Button bsPrefix="btn custom-btn red-3 eggshell-text" type="submit">
              Submit
            </Button>

            <Button bsPrefix="btn custom-btn red-3 eggshell-text" onClick={this.deleteCharacter}>
              DELETE
            </Button>

            <Button bsPrefix="btn custom-btn red-3 eggshell-text" onClick={this.props.swapEditorState}>
              Cancel
            </Button>
          </ButtonGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { characters: state.characters };
};

const mapDispatchToProps = dispatch => {
  return {
    patchCharacter: charObj => dispatch(patchCharacter(charObj))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CharacterForm)
);
