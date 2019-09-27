import * as types from "./actionTypes.js";
// this will need to be modularized based on the current user/story information
//const baseChapterURL = "http://localhost:3000/users/1/stories/1/chapters";

// this action will do something later, need to be able to set the currently selected chapter for editing and updating

export const fetchFootnotes = footnotes => ({
  type: "GET_FOOTNOTES",
  footnotes
});
export const getFootnotes = (chapterID, storyID) => {
  return dispatch => {
    fetch(
      `http://localhost:3000/users/1/stories/${storyID}/chapters/${chapterID}/footnotes`
    )
      .then(resp => resp.json())
      .then(notes => {
        return dispatch(fetchFootnotes(notes));
      })
      .catch(err => console.error("error fetching things", err));
  };
};

export const postFootNoteFetch = footnote => ({
  type: "POST_FOOTNOTE",
  footnote
});
export const postFootNote = chapter => {
  return dispatch => {
    fetch(
      `http://localhost:3000/users/1/stories/${chapter.story_id}/chapters/${chapter.id}/footnotes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          title: "New Note",
          body: "New Note Body",
          chapter_id: chapter.id
        })
      }
    )
      .then(resp => resp.json())
      .then(json => {
        return dispatch(postFootNoteFetch(json));
      });
  };
};

export const patchFootNoteFetch = footnote => ({
  type: "PATCH_FOOTNOTE",
  footnote
});
export const patchFootNote = (chapter, footnote) => {
  return dispatch => {
    fetch(
      `http://localhost:3000/users/1/stories/${chapter.story_id}/chapters/${chapter.id}/footnotes/${footnote.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          title: footnote.title,
          body: footnote.body
        })
      }
    )
      .then(resp => resp.json())
      .then(json => {
        return dispatch(patchFootNoteFetch(json));
      });
  };
};

export const deleteFootNoteFetch = footnote => ({
  type: "DELETE_FOOTNOTE",
  footnote
});
export const deleteFootNote = (chapter, footnote) => {
  return dispatch => {
    fetch(
      `http://localhost:3000/users/1/stories/${chapter.story_id}/chapters/${chapter.id}/footnotes/${footnote.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          id: footnote.id
        })
      }
    )
      .then(resp => resp.json())
      .then(json => {
        return dispatch(deleteFootNoteFetch(json));
      });
  };
};

