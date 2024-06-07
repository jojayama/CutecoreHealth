import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./layout";
import Navbar from "../navbar";
import styles from "../style/diaries.module.css";
import { Link } from "react-router-dom";

export default function ViewEntry() {
  const [diary, setDiary] = useState(null); // Change to null to better handle loading state
  const { id } = useParams(); // Use useParams to get the diary ID from the URL
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  console.log(id);
  const navigate = useNavigate();

  useEffect(() => {
    const getDiary = async () => {
      try {
        const response = await fetch(
          `https://cutecore-health.azurewebsites.net/diaryEntries/${userId}/${id}`,
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
  }, [id, token, userId]);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8000/diaryEntries/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("Success! Delete diary: ", response.status);
      navigate("/diaryEntries");
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
      <div className={styles.entryBox}>
        <div className={styles.boxInEntryBox}>
          {diary ? (
            <div className={styles.diaryDetail}>
              <h1 className={styles.entryTitle}>[{diary.title}]</h1>

              <p className={styles.entry}>{diary.entry}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      {/* <button className={styles.createNewContainer}>
        <p className={styles.createNew}>Edit</p>
      </button> */}
      <button
        onClick={() => handleDelete(diary._id)}
        className={styles.entryDeleteButton}
      >
        Delete
      </button>
      <div className={styles.linkCont}>
        <Link to={"/diaryEntries"} className={styles.link}>
          <a>Return</a>
        </Link>
      </div>
    </div>
  );
}
