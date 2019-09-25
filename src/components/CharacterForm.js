import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import NumericInput from "react-numeric-input";
import Button from "react-bootstrap/Button";

class CharacterForm extends Component {
  weightFormat = num => num + " kg/lbs";
  heightFormat = num => num + " cm/in";

  // load in characer data from the currently selected character state

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) =>{
    console.log("Handle Character submission here")
  }

  deleteCharacer = () => {
    console.log("Delete Here");
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

          <Button variant="danger" type="submit" onClick={this.deleteCharacer}>
            DELETE
          </Button>
        </Form>
      </div>
    );
  }
}

export default CharacterForm;
