import { dataApi } from "../API/api";
const SET_USER_DATA = "SET_USER_DATA";
const SET_ERRORS = "SET_ERRORS";
const SET_AUTH = "SET_AUTH";

const initialState = {
  email: null,
  userName: null,
  isAuth: false,
  errLogin: null,
  errPass: null,
  error: null,
  someError: null,
  isLoading: true,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    case SET_ERRORS:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    case SET_AUTH:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (email, userName, isAuth) => {
  return { type: SET_USER_DATA, payload: { email, userName, isAuth } };
};
export const setAuth = (isAuth) => {
  return { type: SET_AUTH, payload: { isAuth } };
};

export const setErrors = (
  errLogin = null,
  errPass = null,
  error = null,
  someError = null
) => {
  return { type: SET_ERRORS, payload: { errLogin, errPass, error, someError } };
};
export const login = (email, password) => async (dispatch) => {
  const response = await dataApi.login(email, password);
  if (
    response.status > 400 &&
    response.status != 422 &&
    response.status != 401
  ) {
    dispatch(
      setErrors(
        null,
        null,
        null,
        "Internal server error. Please try again later"
      )
    );
  }
  const result = await response.json();
  if (!response.ok) {
    if (response.status == 401 || response.status == 422) {
      let {
        email = null,
        password = null,
        error = null,
        someError = null,
      } = result;
      dispatch(setErrors(email, password, error, someError));
    }
  } else {
    localStorage.setItem("token", result.access_token);
    dispatch(setAuthUserData(result.user.email, result.user.name, true));
  }
};

export const isAuth = () => async (dispatch) => {
  const response = await dataApi.getProfile();
  if (response.status !== 200) {
    localStorage.clear();
    dispatch(setAuthUserData(null, null, false));
    dispatch(setErrors(null, null, null, null));
  }
  if (response.status == 200) {
    dispatch(setAuth(true));
    dispatch(setErrors(null, null, null, null));
  }
};
export const LogOff = () => async (dispatch) => {
  const response = await dataApi.LogOff();
  if (response.status !== 200) {
    dispatch(setAuthUserData(null, null, false));
    dispatch(setErrors(null, null, null, null));
  }
};

export default profileReducer;
