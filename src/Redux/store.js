import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer from './authReducer'
import productsReducer from './productsReducer'
import profileReducer from './profileReducer'


export default configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    profile: profileReducer
  },
})