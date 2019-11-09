## The Project
AESOP is meant to be a tool for writers, and no it is not an acronymn.  The app allows users to create stories, chapters, notes, and stories to help them manage their narrative projects.  Most text input is in a richtext format to get the most out of the user input and allow them to go wild with their imagination.

This was originally created at Flatiron School as a way to showcase my skillset, and is my first dive into redux.
This branch is my rework since leaving the school, and was my first larger-scale undertaking


### Core Features
* Create Stories, Characters, and Notes
* Edit your chapters and character profiles in a richtext format to maximize your organization
* Timed-Autosaving WYSIWYG Chapter Editor
* Save changes to your account, including progress from page to page (as long as you save)

### Packages Inside
* CKEditor5 React w/ Decoupled-Document Editor and Classic Editor
* DOMPurify to sanitize richtext to prevent XSS
* NumericInput for certain numerical form fields
* React Bootstrap / MDBReact for basic component styling
* Thunk for managing async redux
