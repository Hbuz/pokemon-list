import request from "superagent";

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";

export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAILED = "USER_SIGNUP_FAILED";
export const CLEAN_SIGNUP = "CLEAN_SIGNUP";

export const USER_LOGOUT = "USER_LOGOUT";

export const REMOVE_ERRORS = "REMOVE_ERROR";

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:4001";

const userLoginSuccess = user => ({
  type: USER_LOGIN_SUCCESS,
  payload: user
});

const userLoginFailed = error => ({
  type: USER_LOGIN_FAILED,
  payload: error || "Unknown error"
});

const userSignupSuccess = user => ({
  type: USER_SIGNUP_SUCCESS,
  payload: user
});

const userSignupFailed = error => ({
  type: USER_SIGNUP_FAILED,
  payload: error || "Unknown error"
});

export const clean = () => ({
  type: CLEAN_SIGNUP,
});


export const logout = () => ({
  type: USER_LOGOUT
});


export const removePrevErrors = () => ({
  type: REMOVE_ERRORS
})


export const login = (username, password) => dispatch =>
  request
    .post(`${baseUrl}/logins`)
    .send({ username, password })
    .then(result => {
      dispatch(userLoginSuccess(result.body))
      dispatch(removePrevErrors())
    })
    .catch(err => {
      if (err.status === 400) {
        dispatch(userLoginFailed(err.response.body.message));
      } else {
        console.error(err);
      }
    });

export const signup = (username, password) => dispatch =>
  request
    .post(`${baseUrl}/signup`)
    .send({ username, password })
    .then(result => {
      dispatch(userSignupSuccess(result.body))
      dispatch(removePrevErrors());
    })
    .catch(err => {
      if (err.status === 400) {
        dispatch(userSignupFailed(err.response.body.message));
      } else {
        console.error(err);
      }
    });
