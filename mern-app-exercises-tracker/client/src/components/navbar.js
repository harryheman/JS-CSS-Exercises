import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <h3 className="navbar-brand center">Excercises Tracker</h3>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
            <Link to="/" className="nav-link">
              Users
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/exercises" className="nav-link">
              Exercises
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/create-user" className="nav-link">
              Create User
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/create-exercise" className="nav-link">
              Create Exercise
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
