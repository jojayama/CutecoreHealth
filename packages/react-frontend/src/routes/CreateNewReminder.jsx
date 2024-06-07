import React, { useState } from "react";
import styles from "../style/createnew.module.css";
import Navbar from "../navbar";
import Layout from "../routes/layout";
import { Link, useNavigate } from "react-router-dom";

function CreateNewReminder(props) {
  const navigate = useNavigate();

  const [person, setPerson] = useState({
    title: "",
    desc: "",
    time: "",
    date: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    console.log("UserId: " + id);
    const response = await fetch(`http://localhost:8000/reminders/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: person.title,
        note: person.desc,
        time: person.time,
        date: person.date,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Reminder created:", data);
      navigate("/reminders");
    } else {
      console.error("Error creating reminder:", response.statusText);
    }
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
      <Navbar />
      <Layout />
      <h1 className={styles.heading}>New Reminder</h1>
      <form className={styles.form}>
        <div className={styles.buttonContainer}>
          <Link to="/createGoal">
            <button className={styles.button}>Goal</button>
          </Link>
          <button className={styles.buttonClicked}>Reminder</button>
        </div>
        <input
          type="text"
          name="title"
          value={person.title}
          onChange={handleChange}
          className={styles.input}
          placeholder="Reminder title*"
        />
        <input
          type="text"
          name="desc"
          value={person.desc}
          onChange={handleChange}
          className={styles.input}
          placeholder="Description (optional)"
        />
        <h1 className={styles.plaintext}>Set date and time</h1>
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="time"
            value={person.time}
            onChange={handleChange}
            className={styles.smallInput}
            placeholder="12:00AM"
          />
          <input
            type="text"
            name="date"
            value={person.date}
            onChange={handleChange}
            className={styles.smallInput}
            placeholder="12/12/24"
          />
        </div>
        <input
          type="button"
          value="Create"
          onClick={handleSubmit}
          className={styles.button}
        />
      </form>
      <p className={styles.selection}>
        <a href="/reminders">Return</a>
      </p>
    </div>
  );
}

export default CreateNewReminder;
