import React, { useState } from "react";
import styles from "../style/createnew.module.css";
import Navbar from "../navbar";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Link } from "react-router-dom";

function CreateNewGoal(props) {
  const [person, setPerson] = useState({
    title: "",
    desc: "",
    time: "",
    date: "",
  });

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ title: "", desc: "", time: "", date: "" });
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
      <h1 className={styles.heading}>
        New G<FavoriteOutlinedIcon fontSize="large" />
        al!
      </h1>
      <form className={styles.form}>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonClicked}>Goal</button>
          <Link to="/createReminder">
            <button className={styles.button}>Reminder</button>
          </Link>
        </div>
        <input
          type="text"
          name="title"
          value={person.title}
          onChange={handleChange}
          className={styles.input}
          placeholder="Goal title*"
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
          <p className={styles.selection}>
            <a href="/No end time">No end time</a>
          </p>
        </div>
        <input
          type="button"
          value="Create"
          onClick={submitForm}
          className={styles.button}
        />
      </form>
      <p className={styles.selection}>
        <a href="/Return">Return</a>
      </p>
    </div>
  );
}

export default CreateNewGoal;
