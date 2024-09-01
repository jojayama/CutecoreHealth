import React, { useState } from "react";
import styles from "../style/editProfile.module.css";
import Layout from "./layout";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const updateData = { email, currentPassword };

    try {
      const response = await fetch(
        `https://cutecore-health-react-backend.vercel.app/users/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Updated user successfully");
        if (result.token) {
          localStorage.setItem("token", result.token);
        }
        navigate("/profile");
      } else {
        alert("Could not update user: " + result.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage(error.message);
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://cutecore-health-react-backend.vercel.app/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Deleted user from backend");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
      } else {
        const result = await response.json();
        console.error("Error deleting user from backend:", result.message);
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("Error deleting user: ", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.background}>
      <Layout />
      <Navbar />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
      ></link>
      <h1 className={styles.heading}>Edit Profile</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="Enter your new email*"
        />
        <input
          type="password"
          name="currentPassword"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className={styles.input}
          placeholder="Enter your current password*"
        />
        {errorMessage && (
          <div className={styles.errorMessage}>Error: {errorMessage}</div>
        )}
        <input
          type="submit"
          value="Save"
          className={styles.buttonContainer}
          style={{ width: "110px" }}
        />
      </form>
      <button className={styles.deleteUserContainer} onClick={handleDelete}>
        <p className={styles.deleteUser}>Delete User</p>
      </button>
    </div>
  );
}
