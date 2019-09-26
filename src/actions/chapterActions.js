import * as types from "./actionTypes.js";
import thunk from "redux-thunk";
// this will need to be modularized based on the current user/story information
const baseChapterURL = "http://localhost:3000/users/1/stories/1/chapters";

export const setCurrentChapter = chapterObj => {
  return { type: types.SET_CURRENT_CHAPTER, chapterObj };
};

export const receiveChapters = () => {
  return { type: types.RECEIVE_CHAPTERS };
};

// THIS WORKS
export const fetchChapters = chapters => ({ type: "GET_CHAPTERS", chapters });
export const getChapters = (storyID=1 ) => {
  return dispatch => {
    fetch(`http://localhost:3000/users/1/stories/${storyID}/chapters/`)
      .then(resp => resp.json())
      .then(chapters => {
        console.log("===ACTIONS===");
        return dispatch(fetchChapters(chapters));
      })
      .catch(err => console.error("error fetching things", err));
  };
};
// END OF WORKING CODE

export const postChapterFetch = chapter => ({ type: "POST_CHAPTER", chapter });
// form popup later to define title?
export const postChapter = (chapterData = {}, storyID) => {
  return dispatch => {
    fetch("http://localhost:3000/users/1/stories/1/chapters", {
      method: "POST",
      headers: {
        "Content-Type": "applicaiton/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        title: "New Chapter",
        body: "",
        story_id: storyID
      })
    })
      .then(resp => resp.json())
      .then(json => {
        console.log(json);
        console.log("Chapter should be posted, do things here <===");
        return dispatch(postChapterFetch(json));
      });
  };
};

export const patchChapterFetch = chapter => ({
  type: "PATCH_CHAPTER",
  chapter
});
export const patchChapter = (chapterData) => {
  console.log(chapterData)
  return dispatch => {
    fetch( 'http://localhost:3000/users/1/stories/1/chapters' +`/${chapterData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        title: chapterData.title,
        body: chapterData.body
        //chapter data goes here
      })
    })
      .then(resp => resp.json())
      .then(json => {
        console.log(json)
        return dispatch(patchChapterFetch(json));
      });
  };
};

export const deleteChapterFetch = chapter => ({
  type: "DELETE_CHAPTER",
  chapter
});
export const deleteChapter = chapterIndex => {
  return dispatch => {
    fetch(baseChapterURL + `/${chapterIndex}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ id: chapterIndex })
    }).then(resp =>
      resp.json().then(json => {
        console.log(json);
        return dispatch(deleteChapterFetch(json));
      })
    );
  };
};
