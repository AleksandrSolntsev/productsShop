import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import ShopForm from "./components/Products/ShopForm";
import PrivateRoute from "./PrivateRoute";
import { isAuth } from "./Redux/profileReducer";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.profile.isLoading);

  useEffect(() => {
    dispatch(isAuth());
  }, []);

  return (
    <div className="app-wrapper">
      <Header />
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/shop" element={<ShopForm />} />
          </Route>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
