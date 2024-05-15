import React, { useState } from "react";
import styles from "./style/form.module.css"; 
import Navbar from "./navbar";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

function Form(props) {
  const [person, setPerson] = useState({
    name: "",
    job: ""
  });

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ name: "", job: "" });
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
      <h1 className={styles.heading}>Create Account</h1>
      <form className={styles.form}>
      {/* <label htmlFor="name">Username</label> */}
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
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
      />
    </form>
    <p className={styles.newUser}>
    <a href="/Return">Return</a>
    </p>
    </div>
    
  );
}

export default CreateAccount;
