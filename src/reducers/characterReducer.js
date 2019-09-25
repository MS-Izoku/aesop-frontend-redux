import * as types from "../actions/actionTypes.js";
export default function(
  state = [{ name: "No Characters Found", biography: "No Biography Found" }],
  action
) {
  switch (action.type) {
    case types.GET_CHARACTERS:
      return action.characters;
    case types.POST_CHARACTER:
      return [...characters, action.character];
    case types.PATCH_CHARACTER:
      const charID = action.character.id;
      console.log(charID);
      let newState = state;
      newState.map((char) =>{
        if(char.id === charID){
          return{...char , action.character }
        }
        else return char
      })
      return newState;
    case types.DELETE_CHARACTER:
      return state;
    default:
      return state;
  }
}
