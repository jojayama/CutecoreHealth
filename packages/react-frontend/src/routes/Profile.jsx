import React, { useState } from "react";
import styles from "../style/profile.module.css";
import Layout from "./layout";
import Navbar from "../navbar";

function Profile(props) {
  const [person, setPerson] = useState({
    name: "",
    email: "",
    password: "",
  });

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ name: "", email: "", password: "" });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }));
  }
  return (
    <div className={styles.background}>
      <Layout />
      <Navbar />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
      ></link>
      <h1 className={styles.heading}>Profile</h1>
      <form className={styles.form}>
        {/* <label htmlFor="name">Username</label> */}
        <input
          type="text"
          name="name"
          id="name"
          value={props.name}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter your name*"
        />
        {/* <label htmlFor="job">Password</label> */}
        <input
          type="email"
          name="email"
          id="email"
          value={person.job}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter your email*"
        />
        {/* <label htmlFor="job">Password</label> */}
        <input
          type="password"
          name="password"
          id="password"
          value={person.job}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter your password*"
        />
        <input
          type="button"
          value="Sign up"
          onClick={submitForm}
          className={styles.buttonContainer}
          style={{ width: "130px" }}
        />
      </form>
    </div>
  );
}

export default Profile;
