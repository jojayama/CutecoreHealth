import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Navbar from "../navbar";
import styles from "../style/profile.module.css";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          email: currentUser.email,
          password: "********", // Mask the password
        });
      } else {
        setUser({
          email: "",
          password: "",
        });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

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
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Password:</strong> {user.password}
          </p>
        </div>
        <button className={styles.editContainer}>
          <p className={styles.edit}>
            <Link to={"/editProfile"} className={styles.edit}>
              Edit Info
            </Link>
          </p>
        </button>
      </div>
    </div>
  );
}
