// export default CreateAccount;
import React, { useState } from "react";
import styles from "../style/form.module.css";
// import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";

function CreateAccount(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  //trying to commit

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email: " + email + "\npassword: " + password);
    // const url = "https://cutecore-health-react-frontend.vercel.app/users";
    // console.log("URL: ", url);
    const response = await fetch(
      "https://cutecore-health-react-frontend.vercel.app/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    const user = await response.json();

    if (user) {
      console.log("Created user successfully");
      localStorage.setItem("token", user.token);
      localStorage.setItem("userId", user._id);
    } else {
      alert("Could not create user: " + user.message);
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User created:", user);

        sendEmailVerification(user)
          .then(() => {
            console.log("Email verification sent! Check your email.");
          })
          .catch((error) => {
            const errorCode = error.code;
            setError(true);
            setErrorMessage("Could not create an account: " + error.message);
            const errorMessage = error.message;
            console.error("Error sending email:", error, errorMessage);
          });
        // Optionally, navigate to another page or show a success message
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(true);
        setErrorMessage("Could not create user: " + error.message);
        console.error("Error creating user:", errorCode, errorMessage);
      });
  };

  return (
    <div className={styles.background}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
      ></link>
      <h1 className={styles.heading}>Create Account</h1>
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
