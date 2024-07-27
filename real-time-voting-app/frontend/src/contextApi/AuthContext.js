import React, { useState, useEffect } from "react";
import { AxiosInstance } from "../services/api";

const AuthContext = React.createContext({
  isLoggedIn: false,
  loginHandler: (data) => {},
  logoutHandler: () => {},
});

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInInfo = localStorage.getItem("isLoggedIn");
    const token = localStorage.getItem("token");
    if (loggedInInfo === "1" && token) {
      setIsLoggedIn(true);
      AxiosInstance.defaults.headers["Authorization"] = token;
    }
  }, []);

  const loginHandler = (data) => {
    if (data.success === true) {
      localStorage.setItem("isLoggedIn", "1");
      localStorage.setItem("token", data.token);
      AxiosInstance.defaults.headers["Authorization"] = data.token;
      setIsLoggedIn(true);
    }
  };

  const logoutHandler = () => {
    console.log("bye bye");

    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    delete AxiosInstance.defaults.headers["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
