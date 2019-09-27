import React, { Component } from "react";
import { connect } from "react-redux";
import { getCharacters } from "../actions/characterActions";
import ListGroup from 'react-bootstrap/ListGroup'
import {withRouter} from 'react-router'

class ChapterEditorCharacterbar extends Component {
  componentDidMount() {
    this.props.getCharacters(this.props.match.params.story_id);
  }

  renderCharacters = () => {
    return this.props.characters.map(char => {
      return (
        <ListGroup.Item key={char.id === undefined ? 0 : char.id}>
          {char.name}
        </ListGroup.Item>
      );
    });
  };
  render() {

    return (
      <div>
        <ListGroup>{this.renderCharacters()}</ListGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { characters: state.characters };
};

const mapDispatchToProps = dispatch => {
  return {
    getCharacters: (index) => dispatch(getCharacters(index))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChapterEditorCharacterbar));
