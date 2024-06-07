import React from "react";
import Layout from "./layout";
import Navbar from "../navbar";
import styles from "../style/diaries.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DiaryEntries() {
  const [diaries, setDiaries] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getDiaries = async () => {
      try {
        const response = await fetch(
          `https://cutecore-health-react-backend.vercel.app/diaryEntries/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setDiaries(data);
        } else {
          console.error("Failed to fetch diary entries: ", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching diary entries: ", error);
      }
    };

    getDiaries();
  }, [userId, token]);

  const handleDelete = async (id) => {
    const response = await fetch(
      `https://cutecore-health-react-backend.vercel.app/diaryEntries/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      console.log("Success! Delete diary: ", response.status);
      setDiaries(diaries.filter((diary) => diaries._id !== id));
    } else {
      console.error("Error deleting diary: ", response.statusText);
    }
  };

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
        {diaries.length > 0 ? (
          diaries.map((diaries) => (
            <div key={diaries._id} className={styles.diaryItem}>
              <h2 className={styles.diaryTitle}>
                <Link
                  to={`/viewEntry/${diaries._id}`}
                  className={styles.diaryLink}
                >
                  [{diaries.title}]
                </Link>
                <button
                  onClick={() => handleDelete(diaries._id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </h2>
              <p className={styles.diaryEntry}>{diaries.entry}</p>
              {/* <button
                onClick={() => handleDelete(goal._id)}
                className={styles.deleteButton}
              >
                Delete
              </button> */}
            </div>
          ))
        ) : (
          <p>No diaries found.</p>
        )}
      </div>
      <button className={styles.createNewContainer}>
        <Link to={"/newDiary"} className={styles.createNew}>
          + New Diary Entry
        </Link>
      </button>
    </div>
  );
}
