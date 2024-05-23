import React from "react";
import Layout from "./layout";
import Navbar from "../navbar";
import styles from "../style/reminders.module.css"
import { Link } from "react-router-dom";

export default function Reminders(){
    return(
        <div>
            <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
        ></link>
            <Layout />
            <Navbar/>
            <h1 className={styles.heading}>Reminders</h1>
            <div className={styles.reminderBox}>

            </div>
            <button className={styles.createNewContainer}><Link to={"/createReminder"} className={styles.createNew}>+ New Reminder</Link></button>
        </div>
    )
}