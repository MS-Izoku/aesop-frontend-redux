import React, { Component } from "react";
import { withRouter } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

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
    this.props.switchEditorView()
    // callback the patch function here
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
      <div className="container-fluid">
        <Button onClick={this.props.switchEditorView}>SWITCH</Button>
        <Form onSubmit={this.handleSave}>
          <Form.Group controlId="titleControl">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title..."
              name="title"
              value={this.state.title}
              onChange={event => {
                this.handleChange(event);
              }}
            />
          </Form.Group>

          <Form.Group controlId="textControl">
            <Form.Label>Pitch</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              placeholder="Pitch..."
              name="pitch"
              defaultValue={this.props.currentStory.pitch}
              onChange={this.handleChange}
            />
            <Form.Label>High Concept</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              type="text"
              placeholder="High Concept..."
              name="high_concept"
              defaultValue={this.props.currentStory.high_concept}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button variant="danger" onClick={this.handleDelete}>
            DELETE
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              console.log(this.props);
              this.props.history.push(
                `/chaptereditor/${this.props.match.params.story_id}/${this.props.currentStory.chapters[0].id}`
              );
            }}
          >
            Chapter Editor
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(StoryEditorGUI);
