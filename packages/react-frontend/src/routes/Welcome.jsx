import React from "react";
import Layout from "./layout";
import styles from "../style/welcome.module.css";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { CalendarMonth } from "@mui/icons-material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ImportContactsTwoToneIcon from "@mui/icons-material/ImportContactsTwoTone";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { useState, useEffect } from "react";
import { TrySharp } from "@mui/icons-material";

import { Link } from "react-router-dom";

export default function Welcome() {
  const [reminders, setReminders] = useState([]);
  const userId = localStorage.getItem("userId");
  const [remReceived, setRemReceived] = useState(false);

  useEffect(() => {
    const getReminders = async () => {
      if (!remReceived) {
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
            setRemReceived(true);
          } else {
            console.error("Failed to fetch reminders: ", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching reminders: ", error);
        }
      }
    };

    getReminders();
  }, [userId]);

  return (
    <div className={styles.background}>
      <Layout />
      <div className={styles.navbar}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
        ></link>
        <a>
          <Link to="/welcome" className={styles.heading}>
            Cute Health
          </Link>
        </a>
        <a>
          <Link to="/calendar">
            <CalendarMonth fontSize="large" /> Calendar
          </Link>
        </a>
        <a>
          <Link to="/diaryEntries">
            <ImportContactsTwoToneIcon fontSize="large" /> Diary
          </Link>
        </a>
        <a>
          <Link to="/goals">
            <CheckBoxOutlinedIcon fontSize="large" /> Goals
          </Link>
        </a>
        <a>
          <Link to="/reminders">
            <NotificationsNoneIcon fontSize="large" /> Reminders
          </Link>
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
      <div className={styles.reminder}>
        {reminders.length > 0 ? (
          reminders.map((reminder) => (
            <div key={reminder._id} className={styles.reminderItem}>
              <div className={styles.timeText}>{reminder.time}</div>
              <div className={styles.reminderContainer}>
                <div className={styles.titleText}>{reminder.title}</div>
                <div className={styles.noteText}>{reminder.note}</div>
              </div>
            </div>
          ))
        ) : (
          <p>No reminders to show</p>
        )}
      </div>
      <div className={styles.calendar}>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            multiMonthPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,multiMonthYear",
          }}
          initialView="dayGridMonth"
          selectable={true}
        />
      </div>
    </div>
  );
}
