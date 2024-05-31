import React from "react";
import Layout from "./layout";
import Navbar from "../navbar";
import styles from "../style/diaries.module.css";
import { Link } from "react-router-dom";

export default function DiaryEntries() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
      ></link>
      <Layout />
      <Navbar />
      <h1 className={styles.heading}>Diary</h1>
      <div className={styles.diaryBox}></div>
      <button className={styles.createNewContainer}>
        <Link to={"/createReminder"} className={styles.createNew}>
          + New Diary Entry
        </Link>
      </button>
    </div>
  );
}
