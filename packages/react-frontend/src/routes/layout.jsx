import React from "react";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import styles from "../style/layout.module.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useState, useEffect } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUsername(localStorage.getItem("username"));
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out.");
        navigate("/"); // Navigate to the home page or any other page after logout
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
      });
  }

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
      ></link>
      <Link to={"/profile"} className={styles.profile}>
        <AccountBoxRoundedIcon
          className={styles.profile}
          fontSize="large"
        ></AccountBoxRoundedIcon>
      </Link>
      <button className={styles.logoutContainer} onClick={handleLogout}>
        <span className={styles.logout}>Logout</span>
      </button>
    </div>
  );
}
