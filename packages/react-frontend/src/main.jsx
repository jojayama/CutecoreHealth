// src/main.jsx
import React from "react";
//import ReactDOMClient from "react-dom/client";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./main.css";
import "./style/form.module.css";
// import Root from "./routes/root";
import "./style/form.module.css";
import "./style/navbar.module.css";
import ErrorPage from "./error-page";
import Login from "./routes/Login";
import CreateAccount from "./routes/CreateAccount"
import Welcome from "./routes/Welcome"
import Profile from "./routes/Profile"
import Layout from "./routes/layout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/createAccount",
    element: <CreateAccount />
  },
  {
    path: "/welcome",
    element: <Welcome />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/layout",
    element: <Layout />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// const container = document.getElementById("root");

// // Create a root
// const root = ReactDOMClient.createRoot(container);

// Initial render:
// root.render(<MyApp />);
