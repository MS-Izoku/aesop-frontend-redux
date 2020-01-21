import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { patchFootnote } from "../actions/footnoteActions";

class FootNoteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.currentNote.title,
      body: this.props.currentNote.body
    };
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSave = () => {
    const toggler = this.props.toggleModal;
    toggler();

    console.log(this.state);
    this.props.patchFootnote(
      this.props.match.params.chapter_id,
      this.props.match.params.story_id,
      this.props.currentNote.id,
      this.state
    );
  };

  render() {
    return (
      <Modal show={this.props.modalIsToggled}>
        <Modal.Header>
          <Form.Control
            size="lg"
            type="text"
            name="title"
            defaultValue={this.props.currentNote.title}
            onChange={this.handleChange}
          />
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="footnoteModal">
              <Form.Control
                as="textarea"
                placeholder="Note..."
                name="body"
                defaultValue={this.props.currentNote.body}
                onChange={this.handleChange}
                rows={5}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.toggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return { currentNote: state.footnotes.currentNote };
};
const mapDispatchToProps = dispatch => {
  return {
    patchFootnote: (chapterID, storyID, footnoteID, data) =>
      dispatch(patchFootnote(chapterID, storyID, footnoteID, data))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FootNoteModal)
);
