import { getStories, setCharacterInChapter } from "./storyActions";
import { getFootnotesFromChapter } from "./footnoteActions";

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
          password: userData.password,
          email: userData.email
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
        console.error("ERROR CREATING NEW USER", err);
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
          dispatch(loginUser(json));
          return dispatch(getStories(json.user_id, true));
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch(err => console.error("ERROR LOGGING IN: ", err));
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
      })
      .catch(err => {
        console.error("ERROR GETTING USER-PROFILE:", err);
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
      // if logging in, the storyObj will be an array rather than an object
      dispatch({ type: "SET_CURRENT_STORY_ON_LOGIN", storyObj });
      dispatch(setCurrentCharacterDispatch(storyObj, true, true));
      return dispatch(setCurrentChapterDispatch(storyObj, true));
    }

    dispatch({
      type: "SET_CURRENT_STORY",
      storyObj
    });
    return fetch(`http://localhost:3000/update-profile/`, {
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
      .catch(err => {
        console.error("Error Setting CurrentStory (fetch)", err);
      });
  };
};

// this will be called in ChapterActions to change the user state
export const setCurrentChapterDispatch = (
  chapterObj,
  loggingIn = false,
  skipPatch = true
) => {
  return dispatch => {
    if (!loggingIn) {
      dispatch({
        type: "SET_CURRENT_CHAPTER",
        chapterObj
      });
      dispatch(getFootnotesFromChapter(chapterObj));
      if (!skipPatch) {
        return fetch(
          `http://localhost:3000/update-profile/${chapterObj.author_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
              current_chapter_id: chapterObj.id
            })
          }
        )
          .then(resp => resp.json())
          .catch(err => {
            console.error("Error Setting the Current Chapter", err);
          });
      }
    } else {
      //dispatch(getFootnotesFromChapter(chapterObj));
      return dispatch({
        type: "SET_CURRENT_CHAPTER_ON_LOGIN",
        storyObj: chapterObj // this will be an array of stories to parse through on login
      });
    }
  };
};

// done after unmounting the app as a whole to save the state
export const saveUserState = userObj =>{
  fetch(`http://localhost:3000/users/${userObj.id}/save-user-state` , {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      current_story_id: userObj.currentStory.id,
      current_chapter_id: userObj.currentStory.id,
      current_character_id: userObj.currentCharacter.id
    }).then(resp => resp.json())
    .then(()=>{
      
    })
    .catch(err => { console.error("Error Updating -User- on refresh" , err)})
  })
}

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

export const setCurrentCharacterDispatch = (
  characterObj,
  loggingIn = false,
  skipFetch = false
) => {
  return dispatch => {
    if (!loggingIn) {
      if (!skipFetch) {
        fetch(
          `http://localhost:3000/update-profile/${characterObj.author_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
              current_character_id: characterObj.id
            })
          }
        )
          .then(resp => resp.json())
          .catch(err => {
            console.error("ERROR SETTING CURRENT CHARACTER:", err);
          });
      }
      return dispatch({ type: "SET_CURRENT_CHARACTER", characterObj });
    } else {
      return dispatch({ type: "SET_CURRENT_CHARACTER_ON_LOGIN", characterObj });
    }
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

export const addFootnoteToCurrenChapter = footnoteObj => {
  return dispatch => {
    return dispatch({ type: "ADD_FOOTNOTE_TO_CURRENT_CHAPTER", footnoteObj });
  };
};

export const updateFootnoteInCurrentChapter = footnoteObj => {
  return dispatch => {
    return dispatch({
      type: "UPDATE_FOOTNOTE_IN_CURRENT_CHAPTER",
      footnoteObj
    });
  };
};
