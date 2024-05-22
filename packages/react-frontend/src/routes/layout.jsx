import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import React, { useState } from "react";
import styles from '../style/layout.module.css'
import {Link} from 'react-router-dom'


export default function Layout(){
    return(
        <div>
            <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
        ></link>
        <div className={styles.topBut}>
            <Link to={"/profile"} className={styles.topBut}><AccountBoxRoundedIcon className={styles.profile} fontSize='large'/></Link>
            <button className={styles.logoutContainer}>
            <Link to={"/"} className={styles.logout}>Logout</Link>
            </button>
        </div>
        </div>
    )
}