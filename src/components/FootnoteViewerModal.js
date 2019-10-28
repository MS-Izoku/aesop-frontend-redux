import React, { Component } from "react";

import { connect } from "react-redux";
import { patchFootnote, deleteFootnote } from "../actions/footnoteActions";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

class FootnoteViewerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.currentFootnote.title,
      body: this.props.currentFootnote.body
    };
  }

  render() {
    return (

        <Modal.Dialog>
          <Modal.Header closeButton />

          <Modal.Body>
            {props.currentFootnote.body}
            <Button variant="secondary" onClick={() => {}}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save changes
            </Button>
          </Modal.Body>
        </Modal.Dialog>

    );
  }
}
