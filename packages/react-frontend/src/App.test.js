//App.test.js
import { render, screen } from "react";
import mut from "main.jsx";
import Login from "./routes/Login";

test("renders learn react link", () => {
  render(<Login />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});