import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Resgister from "./pages/Resgister";
import Login from "./pages/Login";
import PollCreate from "./pages/PollCreate";
import UserDashboard from "./pages/userDashboard";
import PollVote from "./pages/PollVote";
import AuthContext from "./contextApi/AuthContext";
import PollResults from "./pages/PollResults";
import UserProfile from "./pages/UserProfile";

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Resgister />} />
        <Route path="/register" element={<Resgister />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            authCtx.isLoggedIn ? (
              <UserDashboard OnLogout={authCtx.logoutHandler} />
            ) : (
              <Login /> // Redirect to login if not authenticated
            )
          }
        >
          <Route path="create-poll" element={<PollCreate />} />
          <Route path="vote-poll" element={<PollVote />} />
          <Route path="poll-results" element={<PollResults />} />
          <Route path="profile" element={<UserProfile />} />
          {/* Add other nested routes here */}
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
