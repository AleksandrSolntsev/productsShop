import styles from "./Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../Redux/profileReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleLoginChange = (e) => {
    setLoginValue(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const loginHandler = () => {
    dispatch(login(loginValue, passwordValue));
  };
  if (profile.isAuth) {
    navigate("/shop");
  }

  return (
    <div className={styles.login}>
      <h1>Login Please!</h1>
      <div className={styles.authArea}>
        <div className={styles.loginArea}>
          <label className={styles.inputLabel}>
            Login Please:{" "}
            <input
              name="email"
              type="text"
              placeholder="example@domain.com"
              onChange={handleLoginChange}
              value={loginValue}
            />
          </label>
        </div>
        <div className={styles.errArea}>
          {profile.errLogin && (
            <div style={{ color: "red" }}>{profile.errLogin}</div>
          )}
        </div>
        <div className={styles.passArea}>
          <label className={styles.inputLabel}>
            Password:{" "}
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={handlePasswordChange}
              value={passwordValue}
            />
          </label>
        </div>
        <div className={styles.errArea}>
          {(profile.errPass || profile.error || profile.someError) && (
            <div style={{ color: "red" }}>
              {profile.errPass || profile.error || profile.someError}
            </div>
          )}
        </div>
      </div>
      <button className={styles.loginBtn} onClick={loginHandler}>
        Login
      </button>
    </div>
  );
};

export default Login;
