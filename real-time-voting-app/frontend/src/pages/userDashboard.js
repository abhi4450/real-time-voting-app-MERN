import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import AuthContext from "../contextApi/AuthContext";
import classes from "./userDashboard.module.css";

const UserDashboard = (props) => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isLoggedIn) {
    return <p>Please log in to access the dashboard.</p>;
  }

  return (
    <div className={classes.dashboard}>
      <nav className={classes.nav}>
        <ul>
          <h1>User Dashboard</h1>
          <li>
            <NavLink
              to="create-poll"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Create Poll
            </NavLink>
          </li>
          <li>
            <NavLink
              to="vote-poll"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Vote
            </NavLink>
          </li>
          <li>
            <NavLink
              to="poll-results"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Poll Results
            </NavLink>
          </li>
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              User Profile
            </NavLink>
          </li>
        </ul>
        <button onClick={props.OnLogout} className={classes.logoutButton}>
          Logout
        </button>
      </nav>
      <main className={classes.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
