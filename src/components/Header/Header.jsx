import { useDispatch, useSelector } from "react-redux";
import styles from "./Header.module.css";
import { LogOff } from "../../Redux/profileReducer";

const Header = () => {
  const auth = useSelector((state) => state.profile.isAuth);
  const dispatch = useDispatch();
  const heandleClick = () => {
    localStorage.clear();
    dispatch(LogOff());
  };

  return (
    <header className={styles.header}>
      <img
        className={styles.broccoli}
        alt="Lets Do IT!"
        src="https://www.svgrepo.com/show/275080/broccoli.svg"
      ></img>
      <h1>Best Products Company!</h1>
      {auth && (
        <p className={styles.logout} onClick={heandleClick}>
          LogOut
        </p>
      )}
    </header>
  );
};

export default Header;
