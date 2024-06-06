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
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const auth = getAuth();

  // function submitForm() {
  //   const user = auth.currentUser;

  //   if (user && user.emailVerified) {
  //     updateEmail(user, person.email)
  //       .then(() => {
  //         sendEmailVerification(user)
  //           .then(() => {
  //             console.log("Verification email sent.");
  //             // Optionally, show a success message or navigate to another page
  //             navigate("/profile");
  //           })
  //           .catch((error) => {
  //             console.error("Error sending verification email:", error);
  //           });
  //       })
  //       .catch((error) => {
  //         console.error("Error updating email:", error);
  //       });
  //     navigate("/profile");
  //   }

  //   setPerson({ email: "", password: "" });
  // }

  async function submitForm() {
    const user = auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(person.email);
        console.log("Verification email sent.");

        // Optionally, show a message to the user asking them to verify their email
        // or instruct them to check their email for the verification link
      } catch (error) {
        console.error("Error sending verification email:", error);
        // Optionally, show an error message to the user
        return;
      }
      if (user.emailVerified) {
        try {
          // Update email in Firebase Auth
          await updateEmail(user, person.email);
          console.log("Email updated successfully in Firebase Auth.");

          // Call API to update email in MongoDB
          const response = await fetch(
            `http://localhost:8000/users/${userId}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                userId: user.uid,
                newEmail: person.email,
              }),
            },
          );

          if (response.ok) {
            console.log("Email updated successfully in MongoDB.");
          } else {
            console.error(
              "Error updating email in MongoDB:",
              response.statusText,
            );
          }

          navigate("/profile");
        } catch (error) {
          console.error("Error updating email in Firebase Auth:", error);
        }
      } else {
        console.log("Email not verified. Cannot update email.");
        // Optionally, show an error message or take appropriate action
      }
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
