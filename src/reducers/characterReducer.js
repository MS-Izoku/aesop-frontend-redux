import * as types from "../actions/actionTypes.js";
export default function(
  state = [
    { name: "No Characters Found", biography: "No Biography Found", id: 0 }
  ],
  action
) {
  switch (action.type) {
    case types.GET_CHARACTERS:
      return action.characters;
    case types.POST_CHARACTER:
      return [...state, action.character];
    case types.PATCH_CHARACTER:
      return state.map(char => {
        console.log(action.character)
        if (char.id === action.character.id) return action.character;
        else return char;
      });
    case types.DELETE_CHARACTER:
      console.log('Character Deletion Requires a Character Obj:' , action.character)
      return state.filter(char =>{
        return char.id !== action.character.id
      });
    default:
      return state;
  }
}

// console.log(action.chapter)
// if (chapter.id === action.chapter.id) {
//   return action.chapter
// } else return chapter;
