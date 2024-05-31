// import React, { useState } from "react";
// import styles from "../style/form.module.css";
// import Navbar from "../navbar";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";

// //import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

// function CreateAccount(props) {
//   const [person, setPerson] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   // function submitForm() {
//   //   props.handleSubmit(person);
//   //   setPerson({ name: "", email: "", password: "" });
//   // }

//   const navigate = useNavigate();
//   function submitForm() {
//     createUserWithEmailAndPassword(auth, person.email, person.password)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         console.log("User created:", user);
//         // Optionally, navigate to another page or show a success message
//         navigate("/");
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error("Error creating user:", errorCode, errorMessage);
//       });

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
//       <link
//         rel="stylesheet"
//         href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
//       ></link>
//       <h1 className={styles.heading}>Create Account</h1>
//       <form className={styles.form}>
//         {/* <label htmlFor="name">Username</label> */}
//         <input
//           type="text"
//           name="name"
//           id="name"
//           value={person.name}
//           onChange={handleChange}
//           className={styles.input}
//           placeholder="Enter your name*"
//         />
//         {/* <label htmlFor="job">Password</label> */}
//         <input
//           type="email"
//           name="email"
//           id="email"
//           value={person.email}
//           onChange={handleChange}
//           className={styles.input}
//           placeholder="Enter your email*"
//         />
//         {/* <label htmlFor="job">Password</label> */}
//         <input
//           type="password"
//           name="password"
//           id="password"
//           value={person.password}
//           onChange={handleChange}
//           className={styles.input}
//           placeholder="Enter your password*"
//         />
//         <input
//           type="button"
//           value="Sign up"
//           onClick={submitForm}
//           className={styles.buttonContainer}
//           style={{ width: "130px" }}
//         />
//       </form>
//       <p className={styles.newUser}>
//         <a>
//           <Link to={`/`}>Return</Link>
//         </a>
//       </p>
//     </div>
//   );
// }

// export default CreateAccount;
import React, { useState } from "react";
import styles from "../style/form.module.css";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function CreateAccount(props) {
  const [person, setPerson] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function submitForm() {
    createUserWithEmailAndPassword(auth, person.email, person.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User created:", user);
        // Optionally, navigate to another page or show a success message
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user:", errorCode, errorMessage);
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
      <h1 className={styles.heading}>Create Account</h1>
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
          value="Sign up"
          onClick={submitForm}
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
