import React from "react";
import Layout from "./layout";
import Navbar from "../navbar";
import styles from "../style/profile.module.css";
import { Link } from "react-router-dom"

export default function Profile(props) {
  const { name, email, password } = props;

  // Function to mask the password with asterisks
  //const maskPassword = (password) => '*'.repeat(password.length);

  return (
    <div className={styles.background}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
      ></link>
      <Layout />
      <Navbar />
      <div className={styles.profileInfo}>
        <h1 className={styles.heading}>Profile</h1>
        <div className={styles.info}>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Password:</strong> {password}</p>
        </div>
        <button className={styles.editContainer}>
          <p className={styles.edit}>
            <Link to={"/editProfile"} className={styles.edit}>Edit Info</Link>
            </p>
        </button>
      </div>
    </div>
  );
}