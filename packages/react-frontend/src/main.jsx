// src/main.jsx
import React from "react";
//import ReactDOMClient from "react-dom/client";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style/form.module.css";
import "./style/navbar.module.css";
import "./style/calendar.css";
import ErrorPage from "./error-page";
import Login from "./routes/Login";
import CreateAccount from "./routes/CreateAccount";
import CuteCalendar from "./routes/calendar";
import Welcome from "./routes/Welcome";
import Layout from "./routes/layout";
import Profile from "./routes/Profile";
import EditProfile from "./routes/editProfile";
import Goals from "./routes/goals";
import Reminders from "./routes/reminders";
import CreateNewReminder from "./routes/CreateNewReminder";
import CreateNewGoal from "./routes/CreateNewGoal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/createAccount",
    element: <CreateAccount />,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/layout",
    element: <Layout />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/editProfile",
    element: <EditProfile />,
  },
  {
    path: "/createGoal",
    element: <CreateNewGoal />,
  },
  {
    path: "/createReminder",
    element: <CreateNewReminder />,
  },
  {
    path: "/goals",
    element: <Goals />,
  },
  {
    path: "/reminders",
    element: <Reminders />,
  },
  {
    path: "/calendar",
    element: <CuteCalendar />,
  },
  {
    path: "/goals",
    element: <Goals />,
  },
  {
    path: "/reminders",
    element: <Reminders />,
  },
  {
    path: "/createReminder",
    element: <CreateNewReminder />,
  },
  {
    path: "/createGoal",
    element: <CreateNewGoal />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// const container = document.getElementById("root");

// // Create a root
// const root = ReactDOMClient.createRoot(container);

// Initial render:
// root.render(<MyApp />);
