import React, { Component } from "react";
import NavHeader from "../containers/NavHeader";
import CharacterIndex from "../components/CharacterIndex";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { getCharacters } from "../actions/characterActions";
import PageFooter from "../components/PageFooter";

class CharacterHub extends Component {
  constructor() {
    super();
    this.state = {
      currentCharacers: []
    };
  }
  componentDidMount() {
    this.props.getCharacters(this.props.match.params.story_id)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <NavHeader />
        <CharacterIndex currentCharacers={this.state.characters} />
        <PageFooter />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { characters: state.characters };
};

const mapDispatchToProps = dispatch => {
  return {
    getCharacters: storyID => dispatch(getCharacters(storyID))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CharacterHub)
);
