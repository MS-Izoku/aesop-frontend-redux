import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import NumericInput from "react-numeric-input";
import Button from "react-bootstrap/Button";

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

  // load in characer data from the currently selected character state

  handleChange = event => {
    console.log(event.target.value);
    this.setState({
      currentCharacter: {
        ...this.state.currentCharacter,
        [event.target.name]: event.target.value
      }
    });
  };

  handleHeightChange = (val) => {
    this.setState({currentCharacter: {...this.state.currentCharacter , height: val}})
  };

  handleWeightChange = (val) =>{
    this.setState({currentCharacter: {...this.state.currentCharacter , weight: val}})
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.setCurrentCharacter(this.state.currentCharacter);
    this.props.patchCharacter(this.state.currentCharacter);
    console.log(this.state.currentCharacter);
    this.props.swapEditorState();
  };

  deleteCharacter = () => {
    console.log("Delete Here");
  };

  componentDidMount = () => {
    this.setState({ currentCharacter: this.props.currentCharacter });
  };

  render() {
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
              value={this.state.currentCharacter.name}
              onChange={this.handleChange}
            />
            <hr />
          </Form.Group>

          <Form.Group controlId="character-appearance">
            <h2>Character Appearance</h2>
            <Form.Label>Height</Form.Label>
            <NumericInput
              format={this.heightFormat}
              value={this.state.currentCharacter.height}
              strict={true}
              name="height"
              onChange={this.handleHeightChange}
            />
            <br />
            <Form.Label>Weight</Form.Label>
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

          <Button variant="primary" type="submit">
            Submit
          </Button>

          <Button variant="danger" onClick={this.deleteCharacter}>
            DELETE
          </Button>

          <Button variant="warning" onClick={this.props.swapEditorState}>
            Cancel
          </Button>
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
