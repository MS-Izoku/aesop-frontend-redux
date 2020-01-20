import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { patchStory, setCurrentStory } from "../actions/storyActions";

class StoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      pitch: "",
      high_concept: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const storyObj = Object.assign(
      {},
      { ...this.state, id: this.props.currentStory.id  , user_id: this.props.currentStory.user_id}
    );
    console.log(storyObj)
    this.props.patchStory(storyObj);
    this.props.swapEditorState();
  };

  componentDidUpdate() {
    if (
      this.state.title !== this.props.currentStory.title &&
      !this.props.inEditor
    ) {
      this.setState({
        title: this.props.currentStory.title,
        pitch: this.props.currentStory.pitch,
        high_concept: this.props.currentStory.high_concept
      });
    }
  }

  storyForm = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="storyTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            className="text-center"
            value={this.state.title}
            name="title"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="storyPitch">
          <Form.Label>Pitch</Form.Label>
          <Form.Control
            type="text"
            className="text-center"
            value={this.state.pitch}
            name="pitch"
            onChange={this.handleChange}
          />

          <Form.Label>High Concept</Form.Label>
          <Form.Control
            type="text"
            value={this.state.high_concept}
            name="high_concept"
            onChange={this.handleChange}
            as="textarea"
            rows={5}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  };

  storyViewer = () => {
    return (
      <div id="story-info-gui">
        <h2>{this.state.title == "" ? "Untitled" : this.state.title}</h2>
        <hr />
        <h3>{this.state.pitch}</h3>
        <p>{this.state.high_concept}</p>
        <Button onClick={this.props.swapEditorState}>Edit</Button>
      </div>
    );
  };

  render() {
    return (
      <div className="p-5 bg-warning">
        {this.props.inEditor ? this.storyForm() : this.storyViewer()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentStory: state.user.currentStory,
    user: state.user.currentUser
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCurrentStory: () => dispatch(setCurrentStory()),
    patchStory: storyObj => dispatch(patchStory(storyObj))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryForm);
