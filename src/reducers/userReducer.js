import * as types from "../actions/actionTypes.js";

export default function userReducer(
  state = { user: { username: "That Newjack Swing" } },
  action
) {
  switch (action.type) {
    case types.LOGIN_USER:
      return state;
    case types.LOGOUT_USER:
      return state;
    default:
      return state;
  }
}
