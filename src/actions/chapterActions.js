import { setCurrentChapterDispatch } from './userActions'

export const fetchChapters = chapters => ({ type: "GET_CHAPTERS", chapters });
export const getChapters = (storyID) => {
  return dispatch => {
    fetch(`http://localhost:3000/users/1/stories/${storyID}/chapters/`,{
      method: "GET",
      headers: {
        "Content-Type" : "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(resp => resp.json())
      .then(chapters => {
        return dispatch(fetchChapters(chapters));
      })
      .catch(err => console.error("error fetching things", err));
  };
};

export const postChapterFetch = chapter => ({ type: "POST_CHAPTER", chapter });
export const postChapter = storyID => {
  return dispatch => {
    fetch(`http://localhost:3000/users/1/stories/${storyID}/chapters/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        title: "New Chapter"
      })
    })
      .then(resp => resp.json())
      .then(json => dispatch(postChapterFetch(json)));
  };
};

export const patchChapterFetch = chapter => ({
  type: "PATCH_CHAPTER",
  chapter
});
export const patchChapter = chapterData => {
  return dispatch => {
    fetch(
      `http://localhost:3000/users/1/stories/${chapterData.story_id}/chapters/${chapterData.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
          title: chapterData.title,
          body: chapterData.body
          //chapter data goes here
        })
      }
    )
      .then(resp => resp.json())
      .then(json => {
        console.log("<<<========", json);
        return dispatch(patchChapterFetch(json));
      });
  };
};

export const deleteChapterFetch = chapter => ({
  type: "DELETE_CHAPTER",
  chapter
});
export const deleteChapter = chapter => {
  console.log("DELETING" , chapter)
  return dispatch => {
    fetch(
      `http://localhost:3000/users/1/stories/${chapter.story_id}/chapters/${chapter.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({ id: chapter.id })
      }
    )
      .then(resp => resp.json())
      .then(json => {
        return dispatch(deleteChapterFetch(json));
      });
  };
};

export const setCurrentChapter = chapterObj =>{
  return dispatch => dispatch(setCurrentChapterDispatch(chapterObj))
}