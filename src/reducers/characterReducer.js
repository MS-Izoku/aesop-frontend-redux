import * as types from "../actions/actionTypes.js";
export default function(
  state = [{ name: "No Characters Found", biography: "No Biography Found" }],
  action
) {
  switch (action.type) {
    case types.GET_CHARACTERS:
      return action.characters;
    case types.POST_CHARACTER:
      return [...state, action.character];
    case types.PATCH_CHARACTER:
      return state.map(char =>{
        return char.id === action.character.id ? action.character : char
      });
    case types.DELETE_CHARACTER:
      return state;
    default:
      return state;
  }
}


// console.log(action.chapter)
// if (chapter.id === action.chapter.id) {
//   return action.chapter
// } else return chapter;
