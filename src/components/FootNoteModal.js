import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {connect } from 'react-redux'

class FootNoteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.currentFootnote.title,
      body: this.props.currentFootnote.body
    };
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSave = () => {
    this.props.toggleModal();
  };

  // figure out where in this file to update the form-data

  render() {
    console.log("===FNM===");
    console.log(this.props.currentFootnote);
    console.log(this.state)
    return (
      <Modal show={this.props.modalIsToggled}>
        <Modal.Header>
          <Form.Control
            size="lg"
            type="text"
            name="title"
            value={this.state.title}
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
                value={this.state.body}
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
          <Button variant="primary" onClick={this.props.handleSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) =>{
    return {footnotes: state.footnotes}
}

const mapDispatchToProps = (dispatch) =>{
    return {}
}
export default connect(mapStateToProps , mapDispatchToProps)(FootNoteModal);
