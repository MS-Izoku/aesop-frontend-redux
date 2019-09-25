import * as types from "./actionTypes.js";
// this will need to be modularized based on the current user/story information
//const baseChapterURL = "http://localhost:3000/users/1/stories/1/chapters";

// this action will do something later, need to be able to set the currently selected chapter for editing and updating

export const fetchFootnotes = footnotes => ({type: 'GET_FOOTNOTES', footnotes})
export const getFootnotes = () => {
  return (dispatch) => {
     fetch(`http://localhost:3000/users/1/stories/1/chapters/11/footnotes`)
      .then(resp => resp.json())
      .then(notes => {
        console.log('===ACTIONS===')
        console.log(notes)
        return dispatch(fetchFootnotes(notes));
  })
  .catch(err => console.error('error fetching things', err));
}};