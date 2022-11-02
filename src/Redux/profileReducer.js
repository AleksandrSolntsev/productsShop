import { dataApi } from "../API/api";
const SET_USER_DATA = "SET_USER_DATA";
const SET_ERRORS = "SET_ERRORS";
const SET_AUTH = "SET_AUTH"

const initialState = {
  //стартовые входные данные
  email: null,
  userName: null,
  isAuth: false,
  errLogin: null,
  errPass: null,
  error: null,
  someError: null,
};

const profileReducer = (state = initialState, action) => {
  ////если в стейт ничего не приходит, возми данные из initialState
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload, // в созданом обьекте data будет лежать id email login (перезатрут ...state)
      };
    case SET_ERRORS:
      return {
        ...state,
        ...action.payload, // в созданом обьекте data будет лежать id email login (перезатрут ...state)
      };
      case SET_AUTH:
      return {
        ...state,
        ...action.payload,
      }
    default: ///если совпадений нет вернуть стейт
      return state;
  }
};

export const getAuthUserData = () => async (dispatch) => {
  console.log("URA BLYA");
  // let response = await dataApi.me();
  //     if(response.data.resultCode === 0) {
  //           let {id, login, email} = response.data.data
  //           dispatch(setAuthUserData(id, email, login, true));
  //         }
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
  console.log("setErrors action");
  return { type: SET_ERRORS, payload: { errLogin, errPass, error, someError } };
};

////(email, userName, isAuth, token

export const login = (email, password) => async (dispatch) => {
  const response = await dataApi.login(email, password);
  console.log(response.status);
  if (
    response.status > 400 &&
    response.status != 422 &&
    response.status != 401
  ) {
    dispatch(setErrors(null, null, null, "Internal server error. Please try again later"));
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
      console.log("Eror:", result);
    }
  } else {
    console.log("all good", result);
    localStorage.setItem("token", result.access_token);
    console.log(localStorage.getItem("token"))
    dispatch(
      setAuthUserData(
        result.user.email,
        result.user.name,
        true,
        
      )
    );
  }
};

export const isAuth = () => async (dispatch) => {
  const response = await dataApi.getProfile();
  
  if (response.status !== 200) {
    console.log("NOT_AUTHORIZED");
    localStorage.clear()
    dispatch(setAuthUserData(null, null, false));
    dispatch(setErrors(null, null, null, null));
  }
  if (response.status == 200) {
    console.log("AUTHORIZED");
    dispatch(setAuth(true));
    dispatch(setErrors(null, null, null, null));
};
}
export const LogOff = () => async (dispatch) => {
  const response = await dataApi.LogOff();
  console.log(response.status);
  if (response.status !== 200) {
    console.log("NOT_AUTHORIZED");
    dispatch(setAuthUserData(null, null, false));
    dispatch(setErrors(null, null, null, null));
    
  }
};

export default profileReducer;
