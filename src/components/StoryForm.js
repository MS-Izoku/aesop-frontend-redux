import React, { Component } from "react";
import { connect } from "react-redux";

//import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { patchStory, setCurrentStory } from "../actions/storyActions";

class StoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.currentStory.title,
      pitch: this.props.currentStory.pitch,
      high_concept: this.props.currentStory.high_concept,
      user_id: this.props.user.id
    };
  }

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (
      this.state.title !== "" &&
      this.props.currentStory.pitch !== "" &&
      this.props.currentStory.high_concept !== ""
    ) {
      const storyObj = Object.assign(
        {},
        { ...this.state, id: this.props.currentStory.id }
      );
      this.props.patchStory(storyObj);
      this.props.swapEditorState();
    }
  };

  render() {
    //console.log(this.state);
    return (
      <div className="p-5 bg-warning">
        {/* <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={this.state.title}
            name="title"
            onChange={this.handleChange}
          />
          <label>Pitch</label>
          <input
            type="text"
            value={this.state.pitch}
            name="pitch"
            onChange={this.handleChange}
          />

          <label>High Concept</label>
          <textarea
            type="text"
            value={this.state.high_concept}
            name="high_concept"
            onChange={this.handleChange}
          />
          <Button type="submit">Submit</Button>
        </form> */}

        {/* <form>
          <input
            type="text"
            name="title"
            value={this.state.title}
            id="story-form-title"
            placeholder="Your Story Title..."
            className="form-control text-center"
          />

          <input
            name="pitch"
            id="story-form-pitch"
            className="form-control text-center"
            placeholder="Your Story Pitch"
            onChange={this.handleChange}
            value={this.state.pitch}
          />
          <textarea
            name="high_concept"
            id="story-form-high-concept"
            placeholder="High-Concept, what is a summarized, long form version of your pitch?"
            className="form-control"
            value={this.state.high_concept}
          />
          <div className="text-center mt-4"></div>
          <Button type="submit">Submit</Button>
        </form> */}

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              value={this.state.title}
              name="title"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              value={this.state.pitch}
              name="pitch"
              onChange={this.handleChange}
            />

            <Form.Label>Email address</Form.Label>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryForm);
