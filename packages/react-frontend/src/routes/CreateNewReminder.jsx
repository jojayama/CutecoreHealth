import React, { useState } from "react";
import styles from "../style/createnew.module.css"; 
import Navbar from "../navbar";

function CreateNewReminder(props) {
  const [person, setPerson] = useState({
    title: "",
    desc: "",
    time: "",
    date: ""
  });

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ title: "", desc: "", time: "", date: "" });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value
    }));
  }

  return (
    <div className={styles.background}>
      <Navbar/>
      <h1 className={styles.heading}>New Reminder</h1>
      <form className={styles.form}>    
        <div className={styles.buttonContainer}>
              <button className={styles.button}>Goal</button>
              <button className={styles.buttonClicked}>Reminder</button>
        </div>
        <input
          type="text"
          name="goal"
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
          <h1 className={styles.plaintext}>Recurs: </h1>
          <div>
            <p className={styles.selection}>
              <a href="/Never">Never</a>
            </p>
            <p className={styles.selection}>
              <a href="/Daily">Daily</a>
            </p>
            <p className={styles.selection}>
              <a href="/Weekly">Weekly</a>
            </p>
            <p className={styles.selection}>
              <a href="/Monthly">Monthly</a>
            </p>
          </div>
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

export default CreateNewReminder;