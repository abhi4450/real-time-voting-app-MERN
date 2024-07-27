import React, { createContext, useState, useEffect, useContext } from "react";
import { AxiosInstance } from "../services/api";
import AuthContext from "./AuthContext";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await AxiosInstance.get("/profile");
        console.log("This is the fetched user profile", response.data);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    if (authCtx.isLoggedIn) {
      fetchUserProfile();
    }
  }, [authCtx.isLoggedIn]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserContext;
