import React, { Component } from "react";
import { withRouter } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class StoryEditorGUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      high_concept: "",
      pitch: ""
    };
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSave = event => {
    event.preventDefault();
    console.log(this.state);
    this.props.saveStory(this.state);
    this.props.switchEditorView();
  };

  handleDelete = event => {
    event.preventDefault();
    this.props.handleDelete();
  };

  componentDidMount() {
    console.log("Mouting props", this.props);
    this.setState({
      title: this.props.currentStory.title,
      high_concept: this.props.currentStory.high_concept,
      pitch: this.props.currentStory.pitch
    });
  }

  render() {
    return (
      <div className="grey-light">
        <Form onSubmit={this.handleSave}>
          <div className="pt-3 pb-3 mx-3">
            <Form.Group controlId="titleControl" className="text-center">
              <Form.Label>Title</Form.Label>
              <Form.Control
                className="eggshell"
                type="text"
                placeholder="Title..."
                name="title"
                value={this.state.title}
                onChange={event => {
                  this.handleChange(event);
                }}
              />
            </Form.Group>

            <Form.Group
              controlId="textControl"
              className="text-center"
            >
              <Form.Label>Pitch</Form.Label>
              <Form.Control
              className="eggshell"
                as="textarea"
                rows={3}
                type="text"
                placeholder="Pitch..."
                name="pitch"
                defaultValue={this.props.currentStory.pitch}
                onChange={this.handleChange}
              />
              <Form.Label className="mt-3">High Concept</Form.Label>
              <Form.Control
              className="eggshell"
                as="textarea"
                rows={5}
                type="text"
                placeholder="High Concept..."
                name="high_concept"
                defaultValue={this.props.currentStory.high_concept}
                onChange={this.handleChange}
              />
            </Form.Group>
          </div>

          <ButtonGroup className="container-fluid red-3 mb-3 mt-3">
            <Button type="submit" bsPrefix="custom-btn btn red-3 col">
              Save
            </Button>
            <Button
              onClick={this.handleDelete}
              bsPrefix="custom-btn btn red-3 col"
            >
              DELETE
            </Button>
            <Button
              bsPrefix="custom-btn btn red-3 col"
              onClick={() => {
                console.log(this.props);
                this.props.history.push(
                  `/chaptereditor/${this.props.match.params.story_id}/${this.props.currentStory.chapters[0].id}`
                );
              }}
            >
              Chapter Editor
            </Button>
          </ButtonGroup>
        </Form>
      </div>
    );
  }
}

export default withRouter(StoryEditorGUI);
