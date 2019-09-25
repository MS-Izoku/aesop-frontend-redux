import * as types from "../actions/actionTypes.js";
export default function(
  state = [{ id: 0, title: "Allo", body: "N/A" , chapter_id: 11 }],
  action
) {
  switch (action.type) {
    case types.GET_FOOTNOTES:
      console.log(state);
      return action.footnotes;
    case types.POST_FOOTNOTE:
      return state;
    case types.PATCH_FOOTNOTE:
      return state;
    case types.DELETE_FOOTNOTE:
      return state;
    default:
      return state;
  }
}
