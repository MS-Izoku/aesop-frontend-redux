// NOTES: Most things here will at some point be stored in localStorage

import { updateCharacterDispatch } from "./characterActions";
import { getStories, setCharacterInChapter } from "./storyActions";

// Create User
export const postUser = userData => {
  return dispatch => {
    fetch(`http://localhost:3000/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: userData.username,
          password: userData.password
        }
      })
    })
      .then(resp => resp.json())
      .then(json => {
        localStorage.setItem("token", json.jwt);
        const configuredUserObject = Object.assign(
          {},
          { ...json, currentStory: {}, currentChapter: {} }
        );
        return dispatch(loginUser(configuredUserObject));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// Login Existing User
const loginUser = userObj => ({ type: "LOGIN_USER", userObj });
export const loginUserFetch = userData => {
  return dispatch => {
    return fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user: userData })
    })
      .then(resp => resp.json())
      .then(json => {
        if (!json.message) {
          localStorage.setItem("token", json.jwt);
          // localStorage.setItem("story", "I am here");
          dispatch(loginUser(json));
          return dispatch(getStories(json.user_id , true));
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch(err => console.error("CAUGHT ERROR: ", err));
  };
};

// Get User Profile
export const getUserProfile = () => {
  return dispatch => {
    const token = localStorage.token;
    return fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => resp.json())
      .then(json => {
        if (!json.message) {
          const configuredUserObject = Object.assign(
            {},
            { ...json, currentStory: {}, currentChapter: {} }
          );
          dispatch(loginUser(configuredUserObject));
        } else {
          localStorage.removeItem("token");
        }
      });
  };
};

// Logout User and Delete JWT token
const logOutUser = () => ({ type: "LOG_OUT", payload: {} });
export const logOut = () => {
  localStorage.removeItem("token");
  return dispatch => dispatch(logOutUser());
};

// this will be called in the StoryActions to change the user state
export const setCurrentStoryDispatch = (storyObj, loggingIn = false) => {
  return dispatch => {
    if (loggingIn) {
      console.log("SETTING CURRENT STORY ON LOGIN")
      // if logging in, the storyObj will be an array rather than an object
      return dispatch({ type: "SET_CURRENT_STORY_ON_LOGIN", storyObj });
    }

    dispatch({
      type: "SET_CURRENT_STORY",
      storyObj
    });
    return fetch(`http://localhost:3000/update-profile/${storyObj.user_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        current_story_id: storyObj.id
      })
    })
      .then(resp => resp.json())
      .then(console.log)
      .catch(err => {
        console.error("Error Setting CurrentStory (fetch)", err);
      });
  };
};

// this will be called in ChapterActions to change the user state
export const setCurrentChapterDispatch = (chapterObj, loggingIn = false) => {
  return dispatch => {
    if (!loggingIn)
      return dispatch({
        type: "SET_CURRENT_CHAPTER",
        chapterObj
      });
    else
      return dispatch({
        type: "SET_CURRENT_CHAPTER_ON_LOGIN",
        chapterObj
      });
  };
  // return dispatch => {
  //   if (loggingIn) {
  //     // if logging in, the chapterObj will be an array rather than an object
  //     return dispatch({ type: "SET_CURRENT_CHAPTER_ON_LOGIN", chapterObj });
  //   }

  //   dispatch({
  //     type: "SET_CURRENT_CHAPTER",
  //     chapterObj
  //   });
  //   console.log("CHAPTER OBJ" , chapterObj)
  //   return fetch(`http://localhost:3000/update-profile/${chapterObj.owner_id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: `Bearer ${localStorage.token}`
  //     },
  //     body: JSON.stringify({
  //       current_chapter_id: chapterObj.id
  //     })
  //   })
  //     .then(resp => resp.json())
  //     .catch(err => {
  //       console.error("Error Setting CurrentStory (fetch)", err);
  //     });
  // };
};

export const removeChapterDispatch = chapterObj => {
  return dispatch =>
    dispatch({
      type: "REMOVE_CHAPTER",
      chapterObj
    });
};

export const updateUserChapterInStory = chapterObj => {
  return dispatch => {
    return dispatch({ type: "UPDATE_CHAPTER", chapterObj });
  };
};

export const setCurrentCharacterDispatch = characterObj => {
  return dispatch => {
    return dispatch({ type: "SET_CURRENT_CHARACTER", characterObj });
  };
};

export const updateCurrentCharacterDispatch = characterObj => {
  return dispatch => {
    dispatch(setCharacterInChapter(characterObj));
    return dispatch({ type: "UPDATE_CURRENT_CHARACTER", characterObj });
  };
};

export const addChapterToCurrentStoryDispatch = chapterObj => {
  return dispatch => {
    return dispatch({ type: "ADD_CHAPTER_TO_CURRENT_STORY", chapterObj });
  };
};
