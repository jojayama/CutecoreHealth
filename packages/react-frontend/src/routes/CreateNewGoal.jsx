import React, { useState } from "react";
import styles from "../style/createnew.module.css";
import Navbar from "../navbar";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Link, Navigate, useNavigate } from "react-router-dom";

function CreateNewGoal(props) {
  const [person, setPerson] = useState({
    title: "",
    desc: "",
    deadline: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    console.log("UserId: " + id);
    const response = await fetch(
      `https://cutecore-health-react-frontend.vercel.app/goals/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: person.title,
          description: person.desc,
          deadline: person.deadline,
        }),
      },
    );
    if (response.ok) {
      const data = await response.json();
      console.log("Reminder created:", data);
      navigate("/goals");
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
          placeholder="Description (upto 80 characters)"
        />
        <h1 className={styles.plaintext}>Set Date</h1>
        <div className={styles.inputContainer}>
          {}
          <input
            type="text"
            name="deadline"
            value={person.deadline}
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
        <a href="/goals">Return</a>
      </p>
    </div>
  );
}

export default CreateNewGoal;
