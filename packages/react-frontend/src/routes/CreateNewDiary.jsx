import React, { useState } from "react";
import Layout from "./layout";
import Navbar from "../navbar";
import styles from "../style/diaryentry.module.css";
import { Link, useNavigate } from "react-router-dom";

function CreateNewEntry(props) {
  const navigate = useNavigate();

  const [diary, setDiary] = useState({
    title: "",
    entry: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    console.log("UserId: " + id);
    const response = await fetch(`http://localhost:8000/diaryEntries/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: diary.title,
        entry: diary.entry,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Entry created:", data);
      navigate("/diaryEntries");
    } else {
      console.error("Error creating entry:", response.statusText);
    }
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
          className={styles.titleInput}
          placeholder="Title..."
        />
        <textarea
          type="text"
          name="entry"
          value={diary.entry}
          onChange={handleChange}
          className={styles.entryInput}
          placeholder="..."
        />
      </div>
      <button className={styles.createNewContainer}>
        <input
          type="button"
          value="Save"
          onClick={handleSubmit}
          className={styles.button}
        />
      </button>
      <p className={styles.selection}>
        <a href="/diaryEntries">Return</a>
      </p>
    </div>
  );
}

export default CreateNewEntry;
