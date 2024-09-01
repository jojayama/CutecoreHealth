import React, { useState, useEffect } from "react";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import styles from "../style/layout.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUsername(localStorage.getItem("username"));
  }, []);

  function handleLogout() {
    // Remove user information from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // Optionally, you can also make a request to your backend to invalidate the token
    // if your backend supports token invalidation.

    // Redirect the user to the home page or login page after logout
    navigate("/");

    console.log("User logged out.");
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
