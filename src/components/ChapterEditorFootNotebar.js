import React, { Component } from "react";
import { getFootnotes } from "../actions/footnoteActions.js";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

class ChapterEditorFootnoteBar extends Component {
  componentDidMount() {
    console.log('Getting Footnotes')
    this.props.getFootnotes();
  }

  renderListItems = () => {
    return this.props.footnotes.map(note => {
      return <ListGroup.Item key={note.id}>{note.body}</ListGroup.Item>;
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <ListGroup>
          {this.renderListItems()}
          <ListGroup.Item>
            <Button>New Note</Button>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //debugger
  return { footnotes: state.footnotes };
};

const mapDispatchToProps = dispatch => {
  return {
    getFootnotes: () => dispatch(getFootnotes())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChapterEditorFootnoteBar);
