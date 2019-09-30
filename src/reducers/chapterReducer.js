import * as types from "../actions/actionTypes.js";
import update from "immutability-helper";

export default function chapterReducer(
  state = [
    { id: 0, title: "Cream Frieche!", body: "This is my body, it is default" }
  ],
  action
) {
  switch (action.type) {
    case types.GET_CHAPTERS:
      return action.chapters.sort((a,b) =>{
        return a.chapter_index - b.chapter_index
      });
    case types.POST_CHAPTER:
      return [...state, action.chapter];
    case types.PATCH_CHAPTER:
      return state.map(chapter => {
        if (chapter.id === action.chapter.id) {
          return action.chapter
        } else return chapter;
      });
    case "DELETE_CHAPTER":
      console.log('You hit the reducer')
      return state.filter(chapter => {return chapter.id !== action.chapter.id});
    //return state
    default:
      return state;
  }
}
