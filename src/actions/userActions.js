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
  console.log("Logging In");
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
          localStorage.setItem("story", "I am here");
          return dispatch(loginUser(json));
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch(err => console.log("CAUGHT ERROR: ", err));
  };
};

// Get User Profile
export const getUserProfile = () => {
  console.log("Checking for profile");
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
  console.log("Logging Out");
  localStorage.removeItem("token");
  return dispatch => dispatch(logOutUser());
};

// this will be called in the StoryActions to change the user state
export const setCurrentStoryDispatch = storyObj => {
  console.log("Action Received");
  return dispatch => {
    return dispatch({
      type: "SET_CURRENT_STORY",
      storyObj
    });
  };
};
