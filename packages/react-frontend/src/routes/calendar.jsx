import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import styles from "../style/CuteCalendar.module.css";
import Navbar from "../navbar";
import Layout from "./layout";

export default function CuteCalendar() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
      ></link>
      <Layout />
      <Navbar />
      <div className={styles.CuteCalendar}>
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
