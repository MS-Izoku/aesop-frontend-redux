import * as types from "../actions/actionTypes.js";
export default function(
  state = {
    allNotes: [{ id: 0, title: "Allo", body: "N/A", chapter_id: 11 }],
    currentNote: { id: 0, title: "Allo", body: "N/A", chapter_id: 11 }
  },
  action
) {
  switch (action.type) {
    case types.GET_FOOTNOTES:
      console.log(
        "CHECKING ACTION <<<<<<<<",
        Object.assign(state, { ...state, allNotes: action.footnotes })
      );
      return Object.assign(
        {},
        {
          ...state,
          allNotes: action.footnotes
        }
      );
    //return Object.assign(state, { ...state, allNotes: action.footnotes });
    //return action.footnotes;
    case types.POST_FOOTNOTE:
      return Object.assign(state, {
        allNotes: [...state.allNotes, action.footnote]
      });
    //return [...state, action.footnote];
    case types.PATCH_FOOTNOTE:
      console.log(action.footnote)
      return state
    case types.DELETE_FOOTNOTE:
      console.log(action.id + " <========");
      return state.filter(note => {
        return note.id !== action.id;
      });
    case "SET_CURRENT_FOOTNOTE":
      console.log("ACTIONS , assigning footnote <<<<<", action.footnote);
      return Object.assign({}, { ...state, currentNote: action.footnote });
    default:
      return state;
  }
}
