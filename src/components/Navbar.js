import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
    const { showAlert } = props
    let history = useNavigate()
    let location = useLocation();
    return (
        <div>
            <nav className={`navbar fixed-top navbar-expand-lg navbar-${props.mode} bg-${props.mode} shadow-sm`}>
                <div className="container-fluid px-4">
                    <Link className="navbar-brand fw-bold" to="/">
                        <i className="fas fa-book-open me-2"></i>
                        {props.title}
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active fw-bold" : ""} `} aria-current="page" to="/">
                                    <i className="fas fa-home me-1"></i> Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active fw-bold" : ""}`} to="/about">
                                    <i className="fas fa-info-circle me-1"></i> About
                                </Link>
                            </li>
                            {localStorage.getItem('token') && (
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/profile" ? "active fw-bold" : ""}`} to="/profile">
                                        <i className="fas fa-user me-1"></i> Profile
                                    </Link>
                                </li>
                            )}
                        </ul>
                        <div className="d-flex align-items-center">
                            <div className={`form-check form-switch text-${props.mode === "light" ? "dark" : "light"} me-3`}>
                                <input onClick={props.toggleStyle}
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch" id="flexSwitchCheckDefault"
                                />
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                    <i className={`fas fa-${props.mode === "dark" ? "sun" : "moon"} me-1`}></i>
                                    {props.mode === "dark" ? "Light Mode" : "Dark Mode"}
                                </label>
                            </div>
                            {!localStorage.getItem('token') ? 
                                <div className="d-flex gap-2">
                                    <Link className="btn btn-outline-primary" to="/login" role="button">
                                        <i className="fas fa-sign-in-alt me-1"></i> Login
                                    </Link>
                                    <Link className="btn btn-primary" to="/signup" role="button">
                                        <i className="fas fa-user-plus me-1"></i> Sign Up
                                    </Link>
                                </div> 
                                : ""
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

