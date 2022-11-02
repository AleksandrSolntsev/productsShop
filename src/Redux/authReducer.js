// import { dataApi } from "../API/api";
// const GET_USER_DATA = "GET_USER_DATA";


// let initialState = {
//   //стартовые входные данные
//   email: null,
//   userName: null,
//   isAuth: false,
//   token: null,
//   errLogin: null,
//   errPass: null,
//   error: null,
//   someError: null,
// };

// const authReducer = (state = initialState, action) => {
//   ////если в стейт ничего не приходит, возми данные из initialState
//   switch (action.type) {
//     case GET_USER_DATA:
//       return {
//         ...state,
//         token, // в созданом обьекте data будет лежать id email login (перезатрут ...state)
//       };
    

//     default: ///если совпадений нет вернуть стейт
//       return state;
//   }
// };




// export const setAuthUserData = (email, userName, isAuth, token) => {
//   return { type: GET_USER_DATA, payload: { email, userName, isAuth, token } };
// };



// export const getProfile = (token) => async (dispatch) => {
  
//   const response = await dataApi.getProfile(token);
//   console.log(response);
// //   if (response.status >400 && response.status !=422 && response.status !=401){
// //     dispatch(setErrors(null, null, null, "someEroor"));
// // }
// //   const result = await response.json();
// //   if (!response.ok) {
// //     if (response.status ==401 || response.status ==422 ){
// //     let {
// //       email = null,
// //       password = null,
// //       error = null,
// //       someError = null,
// //     } = result;
// //     dispatch(setErrors(email, password, error, someError));
// //     console.log("Eror:", result);}
    
// // } 
// // else {
// //     console.log("all good", result);
// //     dispatch(
// //       setAuthUserData(
// //         result.user.email,
// //         result.user.name,
// //         true,
// //         result.access_token,
        
// //       )
// //     );
// //   }

//   }

// export default authReducer;