import React from "react";
import styles from "./Login.module.css";
import { dataApi } from "../../API/api";
import { requiredField, maxLength } from "../../Validators/validators";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../Redux/profileReducer";

const Login = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [accesToken, setAccessToken] = useState();

  const handleLoginChange = (e) => {
    setLoginValue(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const onCl = () => {
    dispatch(login(loginValue, passwordValue));
  };
  return (
    <div className={styles.login}>
      <h1>Login Please!</h1>
      <div className={styles.authArea}>
        <div className={styles.loginArea}>
          <h4>Enter Login: </h4>

          <input
            name="email"
            type="text"
            placeholder="example@domain.com"
            onChange={handleLoginChange}
            value={loginValue}
          />
          <div className={styles.errArea}>
            {profile.errLogin && (
              <div style={{ color: "red" }}>{profile.errLogin}</div>
            )}
          </div>
        </div>
        <div className={styles.passArea}>
          <h4>Enter Password:</h4>

          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handlePasswordChange}
            value={passwordValue}
          />
          <div className={styles.errArea}>
            {(profile.errPass || profile.error || profile.someError) && (
              <div style={{ color: "red" }}>
                {profile.errPass || profile.error || profile.someError}
              </div>
            )}
          </div>
        </div>

        <button onClick={onCl}>state</button>
      </div>
    </div>
  );
};

export default Login;
