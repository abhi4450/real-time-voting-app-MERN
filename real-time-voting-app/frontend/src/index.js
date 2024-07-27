import React, { useContext } from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contextApi/AuthContext";
import { UserProvider } from "./contextApi/UserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </AuthProvider>
);
