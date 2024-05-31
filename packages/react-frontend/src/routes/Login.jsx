// import React, { useState } from "react";
// import styles from "../style/form.module.css";
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
// import { Link, useNavigate } from "react-router-dom";
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../firebase';

// function Form(props) {
//   const [person, setPerson] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   // function submitForm() {
//   //   props.handleSubmit(person);
//   //   setPerson({ name: "", job: "" });
//   // }

//   function submitForm() {
//     signInWithEmailAndPassword(auth, person.email, person.password)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         console.log("User logged in:", user);
//         // Optionally, navigate to another page or show a success message
//         navigate("/welcome");
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error("Error logging in:", errorCode, errorMessage);
//       });
//   }

//   function handleChange(event) {
//     const { name, value } = event.target;
//     setPerson((prevPerson) => ({
//       ...prevPerson,
//       [name]: value,
//     }));
//   }

//   return (
//     <div className={styles.background}>
//       <link
//         rel="stylesheet"
//         href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
//       ></link>
//       <h1 className={styles.heading}>
//         Cutec
//         <FavoriteOutlinedIcon fontSize="large" />
//         re Health
//       </h1>
//       <form className={styles.form}>
//         {/* <label htmlFor="name">Username</label> */}
//         <input
//           type="email"
//           name="email"
//           id="email"
//           value={person.email}
//           onChange={handleChange}
//           className={styles.input}
//           placeholder=" Email..."
//         />
//         {/* <label htmlFor="job">Password</label> */}
//         <input
//           type="password"
//           name="password"
//           id="password"
//           value={person.password}
//           onChange={handleChange}
//           className={styles.input}
//           placeholder=" Password"
//         />
//         <input
//           type="button"
//           value="Login"
//           onClick={submitForm}
//           className={styles.buttonContainer}
//         />
//       </form>
//       <p className={styles.newUser}>
//         New User? <br />
//         <a>
//           <Link to={`createAccount`}>Sign up</Link>
//         </a>
//       </p>
//     </div>
//   );
// }

// export default Form;

import React, { useState } from "react";
import styles from "../style/form.module.css";
import Navbar from "../navbar";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Form(props) {
  const [person, setPerson] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function submitForm() {
    signInWithEmailAndPassword(auth, person.email, person.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User logged in:", user);
        // Optionally, navigate to another page or show a success message
        navigate("/welcome");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error logging in:", errorCode, errorMessage);
      });

    setPerson({ email: "", password: "" });
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
      <h1 className={styles.heading}>
        Cutec
        <FavoriteOutlinedIcon fontSize="large" />
        re Health
      </h1>
      <form className={styles.form}>
        <input
          type="text"
          name="email"
          id="email"
          value={person.email}
          onChange={handleChange}
          className={styles.input}
          placeholder="Email..."
        />
        <input
          type="password"
          name="password"
          id="password"
          value={person.password}
          onChange={handleChange}
          className={styles.input}
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
