import { USER_LOGIN_FAILED, REMOVE_ERRORS } from "../actions/auth";

export default function(state = {}, { type, payload }) {
  switch (type) {
    case USER_LOGIN_FAILED:
      return {
        error: payload
      };
    case REMOVE_ERRORS:
      return {
        error: null
      };
    default:
      return state;
  }
}
