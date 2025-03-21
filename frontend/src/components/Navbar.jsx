import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-brand">
          Forum för diskussionstrådar – Din fullstack-resa börjar här
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Hem</Link>
          </li>
          <li>
            <Link to="/create" className="btn-create">
              Skapa nytt inlägg
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
