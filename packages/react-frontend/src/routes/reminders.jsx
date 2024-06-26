import React from "react";
import Layout from "./layout";
import Navbar from "../navbar";
import styles from "../style/reminders.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { TrySharp } from "@mui/icons-material";

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getReminders = async () => {
      try {
        const response = await fetch(
          `https://cutecore-health-react-backend.vercel.app/reminders/${userId}`,
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
  }, [userId, token]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://cutecore-health-react-backend.vercel.app/reminders/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      console.log("deleted reminder");
      setReminders(reminders.filter((reminder) => reminder._id !== id));
    } else {
      console.error("Error deleting reminder: ", response.statusText);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleCheckboxChange = (id, checked) => {
    const updatedReminders = reminders.map((reminder) =>
      reminder._id === id ? { ...reminder, checked } : reminder,
    );
    setReminders(updatedReminders);
    localStorage.setItem("reminders", JSON.stringify(updatedReminders));
  };
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
        <div className={styles.checkbox}></div>
        {reminders.length > 0 ? (
          reminders.map((reminder) => (
            <div key={reminder._id} className={styles.reminderItem}>
              <input
                type="checkbox"
                id={`checkbox-${reminder._id}`}
                className={styles.checkbox}
                checked={reminder.checked}
                onChange={(e) =>
                  handleCheckboxChange(reminder._id, e.target.checked)
                }
              />
              <label htmlFor={`checkbox-${reminder._id}`}></label>
              <p className={styles.reminderDateTime}>
                {formatDate(reminder.date)} at {reminder.time}
              </p>
              <h2 className={styles.reminderTitle}>{reminder.title}</h2>
              <p className={styles.reminderNote}>{reminder.note}</p>
              <button
                onClick={() => handleDelete(reminder._id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <h2 className={styles.notfound}>No reminders yet!</h2>
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
