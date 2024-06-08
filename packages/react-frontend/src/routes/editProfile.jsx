import React, { useState, useEffect } from "react";
import styles from "../style/editProfile.module.css";
import Layout from "./layout";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  updateEmail,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";

export default function EditProfile() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const checkEmailVerified = async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload();
      }
    };

    if (verificationSent) {
      const intervalId = setInterval(() => {
        checkEmailVerified();
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [verificationSent, auth]);

  async function sendVerificationEmail() {
    const user = auth.currentUser;
    if (user && email) {
      try {
        // Reauthenticate the user before updating the email
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword,
        );
        await reauthenticateWithCredential(user, credential);

        // Temporarily update the email in Firebase Auth to send the verification email to the new address
        await updateEmail(user, email);
        console.log("Email temporarily updated to send verification email.");

        // Send verification email to the new email address
        await sendEmailVerification(user);
        console.log("Verification email sent to the new email address.");

        setVerificationSent(true);
      } catch (error) {
        console.error("Error sending verification email:", error);
        setErrorMessage(error.message);
      }
    } else {
      console.log("User is not signed in or email is not provided.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const user = auth.currentUser;

    if (user && user.emailVerified) {
      const updateData = { email };

      try {
        const response = await fetch(`http://localhost:8000/users/${userId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

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
    } else {
      setErrorMessage("Please verify your email before saving changes.");
    }
  }

  const handleDelete = async (id) => {
    const user = auth.currentUser;
    if (user) {
      try {
        // Reauthenticate the user before deleting
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword,
        );
        await reauthenticateWithCredential(user, credential);

        // Delete user from Firebase
        await deleteUser(user);
        console.log("Deleted user from Firebase");

        // Delete user from backend
        const response = await fetch(`http://localhost:8000/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log("Deleted user from backend");
          navigate("/");
        } else {
          console.error(
            "Error deleting user from backend: ",
            response.statusText,
          );
        }
      } catch (error) {
        console.error("Error deleting user: ", error);
        setErrorMessage(error.message);
      }
    } else {
      console.log("User is not signed in.");
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
          type="button"
          value="Send Verification Email"
          onClick={sendVerificationEmail}
          className={styles.buttonContainer}
          style={{ width: "350px" }}
        />
        {verificationSent && (
          <p className={styles.emailAlert}>
            Please check your email and verify before saving changes.
          </p>
        )}
        <input
          type="submit"
          value="Save"
          onClick={handleSubmit}
          className={styles.buttonContainer}
          style={{ width: "110px" }}
        />
      </form>
      <button
        className={styles.deleteUserContainer}
        onClick={() => handleDelete(userId)}
      >
        <p className={styles.deleteUser}>Delete User</p>
      </button>
    </div>
  );
}
