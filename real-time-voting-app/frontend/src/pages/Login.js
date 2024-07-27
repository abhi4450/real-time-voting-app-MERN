import React, { useState, Fragment, useContext } from "react";
import axios from "axios";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contextApi/AuthContext";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const formSubmitHanlder = async (event) => {
    event.preventDefault();
    console.log(email, password);
    setError("");

    try {
      let response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      if (response.status === 200) {
        alert(response.data.message);
        console.log(response.data.user);
        authCtx.loginHandler(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setError(error.response.data.message);
      } else if (error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        console.log(error);
      }
    }
    setEmail("");
    setPassword("");
  };

  return (
    <Fragment>
      <div className={classes.formContainer}>
        <form onSubmit={formSubmitHanlder}>
          <h1>Login</h1>
          <div className={classes.formControl}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={emailChangeHandler}
              required
            />
          </div>

          <div className={classes.formControl}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={passwordChangeHandler}
              required
            />
          </div>
          <div className={classes.formActions}>
            <button type="submit">Login</button>
          </div>
          <p>
            New User?{" "}
            <NavLink className={classes.signupLink} to="/register">
              signup here
            </NavLink>
          </p>
          {error && <p className={classes.errorMessage}>{error}</p>}
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
