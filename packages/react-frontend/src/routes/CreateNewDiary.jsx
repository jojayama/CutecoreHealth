import React, { useState } from "react";
import Layout from "./layout";
import Navbar from "../navbar";
import styles from "../style/diaryentry.module.css";
import { Link } from "react-router-dom";


export default function DiaryEntries() {
    const [diary, setDiary] = useState({
        title: "",
        entry: "",
    });
    
    function submitForm() {
        props.handleSubmit(diary);
        setDiary({ title: "", entry: "" });
    }
      
    function handleChange(event) {
        const { name, value } = event.target;
        setDiary((prevDiary) => ({
          ...prevDiary,
          [name]: value,
        }));
    }
      
    return (
        <div>
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
        ></link>
        <Layout />
        <Navbar />
        <h1 className={styles.heading}>Diary</h1>
        <div className={styles.diaryBox}>
            <input
                type="text"
                name="title"
                value={diary.title}
                onChange={handleChange}
                className={styles.input}
                placeholder="Title..."
            />
            <input
                type="text"
                name="title"
                value={diary.title}
                onChange={handleChange}
                className={styles.input}
                placeholder="..."
            />
        </div>
        <button className={styles.createNewContainer}>
            <Link to={"/diaryEntries"} className={styles.createNew}>
            + Save
            </Link>
        </button>
        </div>
    );
}
