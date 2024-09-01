import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Navbar from "../navbar";
import styles from "../style/profile.module.css";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({
    email: "",
    password: "********", // Masked password
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found, redirecting to login.");
          // Optionally redirect to login if no token is found
          return;
        }

        // Make a request to the backend to get the user's profile information
        const response = await fetch(
          "https://cutecore-health-react-backend.vercel.app/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );

        const result = await response.json();

        if (response.ok) {
          setUser({
            email: result.email,
            password: "********", // Masked password
          });
        } else {
          console.error("Failed to fetch user profile:", result.message);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
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
