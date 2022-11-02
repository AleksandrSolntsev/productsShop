import React from "react";
import styles from "./Profile.module.css";
import { useSelector, useDispatch } from 'react-redux'
import {incrementPageReducer} from '../../Redux/authSlice'
import {getProductListReducer} from '../../Redux/productListSlice'

const Profile = () => {
    const count = useSelector((state)=>state.auth.currentPage)
    const dispatch = useDispatch()

    const count2 = useSelector((state)=>state.products.products)
    const dispatch2 = useDispatch()

    const inc = ()=>{
        dispatch2(getProductListReducer())
        console.log(count2)
    }
  return (
    <div className={styles.profileForm}>
      
      <h1>
        Profile Page
        {count}
      </h1>
      <button onClick={inc}>+1</button>
    </div>
  );
};

export default Profile;
