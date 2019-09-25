import React, { Component } from "react";
import { connect } from "react-redux";

class EditorCharacterPanel extends Component {
  renderCharactersInChapter = () => {
    console.log(this.props);
    return <li key={0}>Chapter-Character</li>;
  };
  render() {
    return (
      <div>
        <ul id="editor-character-panel" className="list-group">
          {this.renderCharactersInChapter}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { characters: state.characters };
};
export default connect(mapStateToProps)(EditorCharacterPanel);
