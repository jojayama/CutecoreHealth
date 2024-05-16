import React, { useState } from "react";
import styles from "../style/form.module.css";
import Navbar from "../navbar";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import {Link} from "react-router-dom"

function Form(props) {
  const [person, setPerson] = useState({
    name: "",
    job: "",
  });

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ name: "", job: "" });
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
      <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
        ></link>
      <Navbar />
      <h1 className={styles.heading}>
        Cutec
        <FavoriteOutlinedIcon fontSize="large" />
        re Health
      </h1>
      <form className={styles.form}>
        {/* <label htmlFor="name">Username</label> */}
        <input
          type="text"
          name="name"
          id="name"
          value={person.name}
          onChange={handleChange}
          className={styles.input}
          placeholder=" Email..."
        />
        {/* <label htmlFor="job">Password</label> */}
        <input
          type="password"
          name="job"
          id="job"
          value={person.job}
          onChange={handleChange}
          className={styles.input}
          placeholder=" Password"
        />
        <input
          type="button"
          value="Login"
          onClick={submitForm}
          className={styles.buttonContainer}
        />
      </form>
      <p className={styles.newUser}>
        New User? <br />
        <a><Link to={`createAccount`}>Sign up</Link></a>
      </p>
    </div>
  );
}

export default Form;