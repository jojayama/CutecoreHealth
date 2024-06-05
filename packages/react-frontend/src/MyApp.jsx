// src/MyApp.jsx

import { useState, useEffect } from "react";
import Form from "./routes/Login";
// following imports dont seem to be used anywhere yet
//import Table from "./Table";
//import LoginPage from "./login";
//import CuteCalendar from "./calendar.jsx"

//import Form from "./Form"; --dont think we need?

function MyApp() {
  function updateList(person) {
    postUser(person)
      .then(() => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      });
  }

  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    const promise = fetch("https://cutecore-health.azurewebsites.net/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users"]))
      .catch((error) => {
        console.log(error);
      });
  }, [characters]);

  //  function deleteUser(id) {
  //    const promise = fetch(`https://cutecore-health.azurewebsites.net//users/${id}`, {
  //      method: "DELETE",
  //    });
  //    return promise;
  //  }

  //  function removeOneCharacter(id) {
  //    // deleteUser(id)
  //    fetch(`https://cutecore-health.azurewebsites.net//users/${id}`, {
  //      method: "DELETE",
  //    })
  //      //.then & .catch
  //      .then((res) => {
  //        if (res.status === 204) {
  //          setCharacters(characters.filter((user) => user._id !== id));
  //        } else {
  //          console.log("Error: Could not delete user.");
  //        }
  //      })
  //      .catch((error) => {
  //        console.log(error);
  //      });
  //  }

  function postUser(person) {
    const promise = fetch("https://cutecore-health.azurewebsites.net/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
      ></link>
      <div className="container" style={{ backgroundColor: "#FFF3FE" }}>
        {/* <Table characterData={characters} removeCharacter={removeOneCharacter} /> */}
        <Form handleSubmit={updateList} />
      </div>
    </div>
  );
}

export default MyApp;
