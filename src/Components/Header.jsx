import React from "react";
import "./header.css";
const Header = () => {
  return (
    <header
      className=" text-white"
      style={{ background: "#81b64c", color: "#FFFFFF" }}
    >
      <div className="container text_white">
        <nav className="navbar navbar-expand-lg text_white ">
          <a className="navbar-brand text_white" href="/">
            My Chess
          </a>
          <button
            className="navbar-toggler text_white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text_white" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link text_white" href="/admin">
                  Admin
                </a>
              </li>{" "}
              <li className="nav-item">
                <a className="nav-link" href="/aboutme">
                  About Me
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
