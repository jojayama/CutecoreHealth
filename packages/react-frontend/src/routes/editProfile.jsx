// import React, { useState } from "react";
// import styles from "../style/editProfile.module.css";
// import Layout from "./layout";
// import Navbar from "../navbar";
// import { Link } from "react-router-dom";

// export default function EditProfile(props) {
//   const [person, setPerson] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   function submitForm() {
//     props.handleSubmit(person);
//     setPerson({ name: "", email: "", password: "" });
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
//       <Layout />
//       <Navbar />
//       <link
//         rel="stylesheet"
//         href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
//       ></link>
//       <h1 className={styles.heading}>Edit Profile</h1>
//       <form className={styles.form}>
//         {/* <label htmlFor="name">Username</label> */}
//         <input
//           type="text"
//           name="name"
//           id="name"
//           value={props.name}
//           onChange={handleChange}
//           className={styles.input}
//           placeholder="Enter your name*"
//         />
//         {/* <label htmlFor="job">Password</label> */}
//         <input
//           type="email"
//           name="email"
//           id="email"
//           value={person.job}
//           onChange={handleChange}
//           className={styles.input}
//           placeholder="Enter your email*"
//         />
//         {/* <label htmlFor="job">Password</label> */}
//         <input
//           type="password"
//           name="password"
//           id="password"
//           value={person.job}
//           onChange={handleChange}
//           className={styles.input}
//           placeholder="Enter your password*"
//         />
//         <input
//           type="button"
//           value="Save"
//           onClick={submitForm}
//           className={styles.buttonContainer}
//           style={{ width: "130px" }}
//         />
//       </form>
//       <button className={styles.deleteUserContainer}>
//         <p className={styles.deleteUser}>Delete User</p>
//       </button>
//     </div>
//   );
// }

import React, { useState } from "react";
import styles from "../style/editProfile.module.css";
import Layout from "./layout";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";
import { getAuth, updateEmail, sendEmailVerification } from "firebase/auth";
import { Link } from "react-router-dom";

export default function EditProfile(props) {
  const [person, setPerson] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const auth = getAuth();

  function submitForm() {
    const user = auth.currentUser;

    if (user) {
      updateEmail(user, person.email)
        .then(() => {
          sendEmailVerification(user)
            .then(() => {
              console.log("Verification email sent.");
              // Optionally, show a success message or navigate to another page
              navigate("/profile");
            })
            .catch((error) => {
              console.error("Error sending verification email:", error);
            });
        })
        .catch((error) => {
          console.error("Error updating email:", error);
        });
      navigate("/profile");
    }

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
      <Layout />
      <Navbar />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
      ></link>
      <h1 className={styles.heading}>Edit Profile</h1>
      <form className={styles.form}>
        {/* <label htmlFor="name">Username</label> */}
        {/* <input
          type="text"
          name="name"
          id="name"
          value={person.name}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter your name*"
        /> */}
        {/* <label htmlFor="job">Password</label> */}
        <input
          type="email"
          name="email"
          id="email"
          value={person.email}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter your email*"
        />
        {/* <label htmlFor="job">Password</label> */}
        <input
          type="password"
          name="password"
          id="password"
          value={person.password}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter your password*"
        />
        <input
          type="button"
          value="Save"
          onClick={submitForm}
          className={styles.buttonContainer}
          style={{ width: "130px" }}
        />
      </form>
      <button className={styles.deleteUserContainer}>
        <p className={styles.deleteUser}>Delete User</p>
      </button>
    </div>
  );
}
