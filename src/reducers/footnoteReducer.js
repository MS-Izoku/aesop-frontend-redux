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
    default:
      return state;
  }
}
