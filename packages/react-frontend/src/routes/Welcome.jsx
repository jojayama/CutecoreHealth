import React from "react";
import Layout from "./layout";
import styles from "../style/welcome.module.css";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { CalendarMonth } from "@mui/icons-material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ImportContactsTwoToneIcon from "@mui/icons-material/ImportContactsTwoTone";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

function Welcome() {
  return (
    <div className={styles.background}>
      <Layout />
      <div className={styles.navbar}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
        ></link>
        <a href="#home" className={styles.heading}>
          Cute Health
        </a>
        <a href="#calendar">
          <CalendarMonth fontSize="large" /> Calendar
        </a>
        <a href="#diary">
          <ImportContactsTwoToneIcon fontSize="large" /> Diary
        </a>
        <a href="#goals">
          <CheckBoxOutlinedIcon fontSize="large" /> Goals
        </a>
        <a href="#reminders">
          <NotificationsNoneIcon fontSize="large" /> Reminders
        </a>
      </div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
      ></link>
      <h1 className={styles.welcome}>
        Welc
        <FavoriteOutlinedIcon fontSize="large" />
        me
      </h1>
    </div>
  );
}

export default Welcome;
