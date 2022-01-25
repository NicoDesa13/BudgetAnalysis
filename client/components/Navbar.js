import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  return (
    <div className="nav-background">
      <h1>Budget Analysis - Exploring Victory</h1>
      <nav>
        {isLoggedIn ? (
          <div className="navbar">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/expensehistory">Expense History</Link>
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
          </div>
        ) : (
          <div className="navbar">
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
