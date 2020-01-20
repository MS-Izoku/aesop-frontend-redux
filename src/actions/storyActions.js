import {
  setCurrentStoryDispatch,
  addChapterToCurrentStoryDispatch
} from "./userActions";

// get stories
export const fetchStories = stories => ({ type: "GET_STORIES", stories });
export const getStories = (userID, loggingIn = false) => {
  return dispatch => {
    fetch(`http://localhost:3000/users/${userID}/stories/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    }).then().then()
  }
};

export const GET_STORIES = "GET_STORIES";

export const fetchStories = stories => ({ type: GET_STORIES, stories });
export const getStories = () => {
  return dispatch => {
    fetch(`https://aesop-backend.herokuapp.com//users/1/stories/`)
      .then(resp => resp.json())
      .then(stories => {
        if (loggingIn) {
          dispatch(fetchStories(stories));
          return dispatch(setCurrentStoryDispatch(stories, true, true));
        } else return dispatch(fetchStories(stories));
      })
      .catch(err =>
        console.error(
          "Error: Last-Visited Story Not Found.  If it's your first time logging in, this is expected, and you can disregard this message.",
          err
        )
      );
  };
};

// Story Creation
export const postStoryFetch = story => ({ type: "POST_STORY", story });
export const postStory = user_id => {
  return dispatch => {

    fetch(`http://localhost:3000/users/${user_id}/stories/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        title: "New Story",
        pitch: "Pitch!",
        high_concept: "A Story Concept"
      })
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch(addChapterToCurrentStoryDispatch(json));
        return dispatch(postStoryFetch(json));
      })
      .catch(err => {
        console.error("ERROR CREATING NEW STORY:", err);
      });
  };
};

// Story Updating
export const patchStoryFetch = story => ({ type: "PATCH_STORY", story });
export const patchStory = story => {
  return dispatch => {
    fetch(`http://localhost:3000/users/${story.user_id}/stories/${story.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        title: story.title,
        pitch: story.pitch,
        high_concept: story.high_concept
      })
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch(setCurrentStoryDispatch(json));
        return dispatch(patchStoryFetch(json));
      })
      .catch(err => {
        console.err("ERROR UPDATING STORY:", err);
      });
  };
};

// Story Deletion
export const deleteStoryFetch = story => ({ type: "DELETE_STORY", story });
export const deleteStory = story => {
  return dispatch => {

    fetch(`http://localhost:3000/users/${story.user_id}/stories/${story.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({ id: story.id })
    })
      .then(resp => resp.json())
      .then(json => {
        return dispatch(deleteStoryFetch(json));
      }).catch(err =>{ console.error("ERROR DELETING STORY:" , err)});
  };
};

// this goes to the user controller
export const setCurrentStory = storyObj => {
  return dispatch => {
    return dispatch(setCurrentStoryDispatch(storyObj));
  };
};

// adds a chapter to the story in the state
const addChapter = chapterObj => ({ type: "ADD_CHAPTER", chapterObj });
export const addChapterToCurrentStory = chapterObj => {
  return dispatch => {
    return dispatch(addChapter(chapterObj));
  };
};

// remvoes a chapter from the story inside the object
const chapterRemoval = chapterObj => ({ type: "REMOVE_CHAPTER", chapterObj });
export const removeChapterFromStoryDispatch = chapterObj => {
  return dispatch => {
    return dispatch(chapterRemoval(chapterObj));
  };
};

export const setCharacterInChapter = characterObj => {
  return dispatch => {
    return dispatch({ type: "SET_CHARACTER_IN_STORY", characterObj });
  };
};
