import React, { Component } from "react";

import { connect } from "react-redux";
import { patchFootnote, deleteFootnote } from "../actions/footnoteActions";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

class FootnoteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.currentFootnote.title,
      body: this.props.currentFootnote.body
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    const configuredFootnoteObj = {
      ...this.props.currentFootnote,
      body: this.state.body,
      title: this.state.body
    };
    this.props.patchFootnote(
      configuredFootnoteObj,
      this.props.currentChapter.story_id
    );
  };

  handleDelete = event => {
    event.preventDefault();
    this.props.deleteFootnote(
      this.props.currentFootnote,
      this.props.currentChapter.story_id
    );
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Modal.Dialog>
          <Modal.Header closeButton />

          <Modal.Body>
            <Form.Group controlId="footnoteInput">
              <Form.Control
                type="text"
                as="textarea"
                size="sm"
                rows="5"
                placeholder="Your Note..."
              />
            </Form.Group>
            <Button variant="secondary" onClick={() => {}}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save changes
            </Button>
          </Modal.Body>
        </Modal.Dialog>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentChapter: state.currentChapter,
    currentFootnote: state.footnotes.currentNote
  };
};

const mapDispatchToProps = dispatch => {
  return {
    patchFootnote: (footnoteObj, storyID) =>
      dispatch(patchFootnote(footnoteObj, storyID)),
    deleteFootnote: (footnoteObj, storyID) =>
      dispatch(deleteFootnote(footnoteObj, storyID))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FootnoteModal);

{
  /* <Form>

<Button variant="primary" type="submit">
  Submit
</Button>
</Form> */
}
