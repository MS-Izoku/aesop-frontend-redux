import * as types from "../actions/actionTypes.js";
export default function(
  state = [
    { id: 0, title: "Allo", body: "N/A", chapter_id: 11 }
  ],
  action
) {
  switch (action.type) {
    case types.GET_FOOTNOTES:
      return action.footnotes;
    case types.POST_FOOTNOTE:
      return [...state, action.footnote];
    case types.PATCH_FOOTNOTE:
      return state;
    case types.DELETE_FOOTNOTE:
      console.log(action.id + ' <========')
      return state.filter(note => {
        return note.id !== action.id;
      });
    default:
      return state;
  }
}
