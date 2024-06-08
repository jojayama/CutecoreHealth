import React, { useState, useEffect } from "react";
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

  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setCurrentDateTime(formattedDate);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    console.log("UserId: " + id);
    const response = await fetch(
      `https://cutecore-health-react-backend.vercel.app/diaryEntries/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: diary.title,
          entry: diary.entry,
          date: diary.date,
        }),
      },
    );
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
        <div className={styles.boxInDiaryBox}>
          <p className={styles.date} value={diary.date}>
            {currentDateTime}
          </p>
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
