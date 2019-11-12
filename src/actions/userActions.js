import { join } from "path";

export const postUserFetch = user => ({ type: "POST_USER", user });
export const postUser = userData => {
  return dispatch => {
    fetch(`https://aesop-backend.herokuapp.com//users/`, {
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
      .then(r => r.json())
      .then(json => {
        localStorage.setItem("token", json.jwt);
        return dispatch(postUserFetch(json));
      });
  };
};
