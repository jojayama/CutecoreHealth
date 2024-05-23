import React from "react";
import Layout from "./layout";
import Navbar from "../navbar"
import styles from "../style/goals.module.css"
import {Link} from "react-router-dom"

export default function Goals(){
    return(
        <div>
            <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
        ></link>
            <Layout />
            <Navbar/>
            <h1 className={styles.heading}>Goals</h1>
            <div className={styles.goalBox}>

            </div>
            <button className={styles.createNewContainer}><Link to={"/createGoal"} className={styles.createNew}>+ New Goal</Link></button>
        </div>
    )
}