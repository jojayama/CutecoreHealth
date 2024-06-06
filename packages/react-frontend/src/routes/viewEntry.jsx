import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./layout";
import Navbar from "../navbar";
import styles from "../style/diaries.module.css";

export default function ViewEntry() {
  const [diary, setDiary] = useState(null); // Change to null to better handle loading state
  const { id } = useParams(); // Use useParams to get the diary ID from the URL
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getDiary = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/diaryEntries/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log("Response status:", response.status); // Log response status
        if (response.ok) {
          const data = await response.json();
          console.log("Response data:", data); // Log response data
          setDiary(data);
        } else {
          console.error("Failed to fetch diary entry:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching diary entry:", error);
      }
    };

    getDiary();
  }, [id, token]);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
      ></link>
      <Layout />
      <Navbar />
      <div className={styles.diaryBox}>
        {diary ? (
          <div className={styles.diaryDetail}>
            <h1 className={styles.diaryTitle}>{diary.title}</h1>
            <p className={styles.diaryEntry}>{diary.entry}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
