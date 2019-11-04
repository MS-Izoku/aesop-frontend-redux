import React from "react";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";

const GoToChapterEditorButton = props => {
  return (
    <Button
      onClick={() => {
        props.history.push("/chaptereditor");
      }}
    >
      Chapter Editor
    </Button>
  );
};

export default withRouter(GoToChapterEditorButton);
