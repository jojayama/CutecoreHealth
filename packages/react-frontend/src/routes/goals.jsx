import React from "react";
import Layout from "./layout";
import Navbar from "../navbar";
import styles from "../style/goals.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [date, setDate] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getGoals = async () => {
      try {
        const response = await fetch(
          `https://cutecore-health-react-frontend.vercel.app/goals/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setGoals(data);
        } else {
          console.error("Failed to fetch goals: ", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching goals: ", error);
      }
    };

    getGoals();
  }, [userId, token]);

  const handleDelete = async (id) => {
    const response = await fetch(
      `https://cutecore-health-react-frontend.vercel.app/goals/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      setGoals(goals.filter((goal) => goal._id !== id));
    } else {
      console.error("Error deleting goal: ", response.statusText);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleCheckboxChange = (id) => {
    const checkedGoals = JSON.parse(localStorage.getItem("checkedGoals")) || {};
    checkedGoals[id] = !checkedGoals[id]; // Toggle the checked state
    localStorage.setItem("checkedGoals", JSON.stringify(checkedGoals));
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Josefin+Slab&display=swap"
      ></link>
      <Layout />
      <Navbar />
      <h1 className={styles.heading}>Goals</h1>
      <div className={styles.goalBox}>
        {goals.length > 0 ? (
          goals.map((goal) => (
            <div key={goal._id} className={styles.goalItem}>
              <input
                type="checkbox"
                id={`checkbox-${goal._id}`}
                className={styles.checkbox}
                checked={
                  JSON.parse(localStorage.getItem("checkedGoals"))?.[goal._id]
                }
                onChange={() => {
                  handleCheckboxChange(goal._id);
                }}
              />
              <label htmlFor={`checkbox-${goal._id}`}></label>
              <p className={styles.goalDate}>{formatDate(goal.deadline)}</p>
              <h2 className={styles.goalTitle}>{goal.title}</h2>
              <p className={styles.goalNote}>{goal.description}</p>
              <button
                onClick={() => handleDelete(goal._id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <h2 className={styles.notfound}>No goals yet!</h2>
        )}
      </div>
      <button className={styles.createNewContainer}>
        <Link to={"/createGoal"} className={styles.createNew}>
          + New Goal
        </Link>
      </button>
    </div>
  );
}
