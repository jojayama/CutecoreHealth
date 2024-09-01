import React, { useState } from "react";
import styles from "../style/form.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function CreateAccount(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email: " + email + "\npassword: " + password);

    try {
      const response = await fetch(
        "https://cutecore-health-react-backend.vercel.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const user = await response.json();

      if (response.ok) {
        console.log("Created user successfully");
        localStorage.setItem("token", user.token);
        localStorage.setItem("userId", user._id);
        // Navigate to the home page or show a success message
        navigate("/");
      } else {
        setError(true);
        setErrorMessage("Could not create user: " + user.message);
        console.error("Error creating user:", user.message);
      }
    } catch (error) {
      setError(true);
      setErrorMessage("An error occurred: " + error.message);
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <div className={styles.background}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
      ></link>
      <h1 className={styles.heading}>Create Account</h1>
      <p className={styles.emailAlert}>
        Look out for an email after signing up to verify your email!
      </p>
      {error && <p className={styles.errorMessage}>{errorMessage}</p>}
      <form className={styles.form}>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          placeholder="Enter your email*"
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          placeholder="Enter your password*"
        />
        <input
          type="button"
          value="Sign up"
          onClick={handleSubmit}
          className={styles.buttonContainer}
          style={{ width: "130px" }}
        />
      </form>
      <p className={styles.newUser}>
        <Link to={`/`}>Return</Link>
      </p>
    </div>
  );
}

export default CreateAccount;
