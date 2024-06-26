import React, { useState } from "react";
import styles from "../style/form.module.css";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Form(props) {
  const [person, setPerson] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("email: ", email);
    console.log("password: ", password);
    const response = await fetch(
      "https://cutecore-health-react-backend.vercel.app/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );
    const result = await response.json();
    if (result) {
      console.log(result);
      localStorage.setItem("token", result.token);
      localStorage.setItem("email", result.email);
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user.emailVerified) {
          console.log("User logged in:", user);
          // Optionally, navigate to another page or show a success message
          navigate("/welcome");
          setError(false); // Reset error state on successful login
        } else {
          console.log("User email not verified:", user);
          setError("Please verify your email before signing in.");
          auth.signOut();
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error logging in:", errorCode, errorMessage);
        setError(true); // Set error state to true on login failure
      });

    setPerson({ email: "", password: "" });
  };

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
      <form className={styles.form}>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${styles.input} ${error ? styles["error-input"] : ""}`}
          placeholder="Email..."
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${styles.input} ${error ? styles["error-input"] : ""}`}
          placeholder="Password"
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
        <Link to={`createAccount`}>Sign up</Link>
      </p>
    </div>
  );
}

export default Form;
