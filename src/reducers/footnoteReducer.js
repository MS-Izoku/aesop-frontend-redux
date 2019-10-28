import * as types from "../actions/actionTypes.js";
export default function(
  state = {
    allNotes: [{ id: 0, title: "Notes Not Found", body: "N/A" }],
    currentNote: { id: 0, title: "No Notes Found", body: "N/A" }
  },
  action
) {
  switch (action.type) {
    case types.GET_FOOTNOTES:
      return Object.assign(
        {},
        {
          ...state,
          allNotes: action.footnotes
        }
      );
    case types.POST_FOOTNOTE:
      return Object.assign({}, { ...state, 
        allNotes: [...state.allNotes, action.footnote]
      });
    case types.PATCH_FOOTNOTE:
      return Object.assign({} , {
        ...state,
        allNotes: state.allNotes.map(note =>{
          return note.id === action.footnote.id ? action.footnote : note
        }),
        currentNote: action.footnote
      })
    case "DELETE_FOOTNOTE":
      return Object.assign({} , {
        ...state ,
        allNotes: state.allNotes.filter(note =>{
          return note.id !== action.footnote.id
        })
      })
    case "SET_CURRENT_FOOTNOTE":
      return Object.assign({}, { ...state, currentNote: action.footnote });
    case "GET_CURRENT_FOOTNOTE":
      return state.currentNote;
    case "SET_ALL_FOOTNOTES":
      return Object.assign({} , {...state , allNotes: action.notes})
    default:
      return state;
  }
}
