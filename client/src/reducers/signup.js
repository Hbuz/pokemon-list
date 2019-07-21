import {
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  REMOVE_ERRORS,
  CLEAN_SIGNUP
} from "../actions/auth";

export default function(state = {}, { type, payload }) {
  switch (type) {
    case USER_SIGNUP_SUCCESS:
      return {
        success: true
      };
    case USER_SIGNUP_FAILED:
      return {
        error: payload
      };
    case CLEAN_SIGNUP:
      return {
        success: false
      };
    case REMOVE_ERRORS:
      return {
        error: null
      };
    default:
      return state;
  }
}
