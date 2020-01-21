import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { patchFootnote, deleteFootnote } from "../actions/footnoteActions";

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
    console.log("SAVING NOTE");
    const configuredFootnoteObj = {
      ...this.props.currentFootnote,
      body: this.state.body,
      title: this.state.title,
      chapter_id: this.props.currentChapter.id
    };
    this.props.patchFootnote(
      configuredFootnoteObj,
      this.props.currentChapter.story_id
    );
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDelete = event => {
    event.preventDefault();
    this.props.deleteFootnote(
      this.props.currentFootnote,
      this.props.currentChapter.story_id
    );
  };

  handleToggle = () => {
    this.props.toggleFootnoteModal();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentFootnote.id !== this.props.currentFootnote.id)
      this.setState({
        title: this.props.currentFootnote.title,
        body: this.props.currentFootnote.body
      });
  }

  render() {
    return (
      <div id="footnote-modal">
        <Modal show={this.props.show} onHide={this.handleToggle}>
          <Form onSubmit={this.handleSubmit}>
            <Modal.Body>
              <Modal.Dialog>
                <Modal.Header closeButton>
                  <Form.Control
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </Modal.Header>
                <Form.Group controlId="footnoteInput">
                  <Form.Control
                    type="text"
                    as="textarea"
                    name="body"
                    size="sm"
                    rows="5"
                    placeholder="Your Note..."
                    value={this.state.body}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Modal.Dialog>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit">Save changes</Button>
              <Button onClick={this.handleToggle}>Close</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentChapter: state.user.currentChapter,
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
