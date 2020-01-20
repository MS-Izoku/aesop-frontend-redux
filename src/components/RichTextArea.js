import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

// give this a "body" prop to give it text
// give it a "changeHandler" prop to allow it to change state in parent elements
// give it a "stateKey" prop to allow it to set state somewhere based on the "key" input
class RichTextArea extends Component {

  render() {
    console.log(this.props)
    return (
      <div className="">
        <CKEditor
          editor={DecoupledEditor}
          data={this.props.body}
          onInit={editor => {
            editor.ui // manual addition of the toolbar
              .getEditableElement()
              .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
              );
          }}
          name="body"
          onChange={(event, editor) => {
            const data = editor.getData();
            this.props.changeHandler(this.props.stateKey, data);
          }}
        />
      </div>
    );
  }
}

export default RichTextArea;
