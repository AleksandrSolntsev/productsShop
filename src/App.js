import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import ShopForm from "./components/Products/ShopForm";


import { isAuth } from "./Redux/profileReducer";


function App() {
  const dispatch=useDispatch()
  useEffect (() => {
    dispatch(isAuth())
    
  }, []);
  const auth = useSelector ((state) => state.profile.isAuth)
  

  return (
    <div className="app-wrapper">
      <HeaderContainer/>
      
      {!auth &&<Login />}
      
      {auth && <ShopForm />}
      

      {/* <Routes>  
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<ShopForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes> */}

      
    </div>
  );
}

export default App;
