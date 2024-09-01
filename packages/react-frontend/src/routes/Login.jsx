import React, { useState } from "react";
import styles from "../style/form.module.css";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Link, useNavigate } from "react-router-dom";

function Form(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend to authenticate the user
      const response = await fetch(
        "https://cutecore-health-react-backend.vercel.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (response.ok && result.token) {
        // Store token and user details in localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("email", result.email);

        // Redirect to welcome page
        navigate("/welcome");
        setError(false); // Reset error state on successful login
      } else {
        console.error("Login failed:", result.message);
        setError(true); // Set error state on login failure
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError(true); // Set error state on request failure
    }
  };

  return (
    <div className={styles.background}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
      ></link>
      <h1 className={styles.heading}>
        Cutec
        <FavoriteOutlinedIcon fontSize="large" />
        re Health
      </h1>
      <Link to={`welcome`} className={styles.guest}>
        Just want to check out the site?
      </Link>
      {error && (
        <div className={styles.errorMessage}>
          Error: Wrong email or password!
        </div>
      )}
      <form className={styles.form} onSubmit={submitForm}>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${styles.input} ${error ? styles["error-input"] : ""}`}
          placeholder="Email..."
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${styles.input} ${error ? styles["error-input"] : ""}`}
          placeholder="Password"
          required
        />
        <input
          type="submit"
          value="Login"
          className={styles.buttonContainer}
        />
      </form>
      <p className={styles.newUser}>
        New User? <br />
        <Link to={`createAccount`}>Sign up</Link>
      </p>
    </div>
  );
}

export default Form;
