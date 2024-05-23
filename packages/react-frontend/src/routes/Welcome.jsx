import React from "react";
import Layout from "./layout";
import styles from "../style/welcome.module.css";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { CalendarMonth } from "@mui/icons-material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ImportContactsTwoToneIcon from "@mui/icons-material/ImportContactsTwoTone";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth'
import {Link} from "react-router-dom"

function Welcome() {
  return (
    <div className={styles.background}>
      <Layout />
      <div className={styles.navbar}>
      <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
        ></link>
      <a>
        <Link to="/welcome" className={styles.heading} >Cute Health</Link>
      </a>
      <a>
      <Link to="/calendar"  ><CalendarMonth fontSize="large" /> Calendar</Link>
      </a>
      <a >
      <Link to="/diary"  ><ImportContactsTwoToneIcon fontSize="large" /> Diary</Link>
      </a>
      <a>
      <Link to="/goals"><CheckBoxOutlinedIcon fontSize="large" /> Goals</Link>
      </a>
      <a >
      <Link to="/reminders"  ><NotificationsNoneIcon fontSize="large" /> Reminders</Link>
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
      <div className={styles.calendar}>
       <FullCalendar
        plugins = {[ dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin ]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,multiMonthYear'
        }}
        initialView="dayGridMonth"
        selectable={true}
      />
      </div>
    </div>
  );
}

export default Welcome;
