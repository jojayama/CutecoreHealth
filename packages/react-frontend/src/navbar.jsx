import React, { useState } from "react";
import styles from "./style/navbar.module.css";
import { CalendarMonth } from "@mui/icons-material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ImportContactsTwoToneIcon from "@mui/icons-material/ImportContactsTwoTone";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
        ></link>
      <a>
        <Link to="/welcome" className={styles.heading} >Cute Health</Link>
      </a>
      <a href="#calendar">
        <CalendarMonth fontSize="large" /> Calendar
      </a>
      <a href="#diary">
        <ImportContactsTwoToneIcon fontSize="large" /> Diary
      </a>
      <a href="#goals">
      <Link to="/goals"><CheckBoxOutlinedIcon fontSize="large" /> Goals</Link>
      </a>
      <a href="#reminders">
      <Link to="/reminders"><NotificationsNoneIcon fontSize="large" /> Reminders</Link>
      </a>
    </div>
  );
};

export default Navbar;
