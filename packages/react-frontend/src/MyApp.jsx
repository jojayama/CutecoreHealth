// src/MyApp.jsx

import { useState, useEffect } from "react";
import Form from "./routes/Login";

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
        {}
        <Form handleSubmit={updateList} />
      </div>
    </div>
  );
}

export default MyApp;
