import React, { useState, Fragment } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import classes from "./Register.module.css";

const Resgister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const formSubmitHanlder = async (event) => {
    event.preventDefault();
    console.log(name, email, password);

    try {
      let response = await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        alert(response.data.message);
        console.log(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Fragment>
      <div className={classes.formContainer}>
        <form onSubmit={formSubmitHanlder}>
          <h1 className={classes.heading}>Register</h1>
          <div className={classes.formControl}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Your Name"
              value={name}
              onChange={nameChangeHandler}
              required
            />
          </div>
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
          {error && <p className={classes.errorMessage}>{error}</p>}
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
            <button type="submit">Register</button>
          </div>
          <p>
            Already Signed Up?{" "}
            <NavLink to="/login" className={classes.loginLink}>
              login here
            </NavLink>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

export default Resgister;
