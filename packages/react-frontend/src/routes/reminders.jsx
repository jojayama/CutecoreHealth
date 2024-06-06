import React from "react";
import Layout from "./layout";
import Navbar from "../navbar";
import styles from "../style/reminders.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { TrySharp } from "@mui/icons-material";

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getReminders = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/reminders/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setReminders(data);
        } else {
          console.error("Failed to fetch reminders: ", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching reminders: ", error);
      }
    };

    getReminders();
  }, [userId]);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
      ></link>
      <Layout />
      <Navbar />
      <h1 className={styles.heading}>Reminders</h1>
      <div className={styles.reminderBox}>
        {reminders.length > 0 ? (
          reminders.map((reminder) => (
            <div key={reminder._id} className={styles.reminderItem}>
              <h2 className={styles.reminderTitle}>{reminder.title}</h2>
              <p className={styles.reminderNote}>{reminder.note}</p>
              <p className={styles.reminderDateTime}>
                {reminder.date} at {reminder.time}
              </p>
            </div>
          ))
        ) : (
          <p>No reminders found.</p>
        )}
      </div>
      <button className={styles.createNewContainer}>
        <Link to={"/createReminder"} className={styles.createNew}>
          + New Reminder
        </Link>
      </button>
    </div>
  );
}
