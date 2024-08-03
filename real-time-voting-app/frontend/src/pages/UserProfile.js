import React, { useContext, useState } from "react";
import UserContext from "../contextApi/UserContext";
import axios from "axios";
import classes from "./UserProfile.module.css";

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  if (!user) {
    return <div>Loading...</div>;
  }

  const createdPolls = user.createdPolls || [];
  const votedPolls = user.votedPolls || [];
  const userName = user.name || "User";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleProfilePictureUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await axios.post(
        "https://real-time-voting-app-mern.onrender.com/api/uploadProfilePicture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setUser((prevState) => ({
        ...prevState,
        profilePicture: `/uploads/${file.name}`,
      }));
      setFile(null);
      setError(null);
    } catch (err) {
      console.error("Error uploading profile picture:", err);
      setError("Failed to upload profile picture");
    }
  };

  return (
    <div className={classes["user-profile"]}>
      <div className={classes["profile-detail"]}>
        <div className={classes["name-photo"]}>
          <h2>Name: {userName}</h2>

          {user.profilePicture && (
            <div className={classes["profile-picture"]}>
              <img
                src={`https://real-time-voting-app-mern.onrender.com${user.profilePicture}`}
                alt="Profile"
                className={classes["profile-img"]}
              />
            </div>
          )}
        </div>
        <div className={classes["profile-uploads"]}>
          <h2>Change Profile</h2>
          <form
            onSubmit={handleProfilePictureUpload}
            className={classes.uploadForm}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={classes.fileInput}
            />
            <button type="submit" className={classes.uploadButton}>
              Upload
            </button>
          </form>
        </div>
        {error && <p className={classes.error}>{error}</p>}
      </div>
      <hr></hr>
      <h3>Created Polls</h3>
      {createdPolls.length > 0 ? (
        createdPolls.map((poll) => (
          <div key={poll._id}>
            <h4>{poll.question}</h4>
            <ul>
              {poll.options.map((option, index) => (
                <li key={index}>
                  {option.text}: {option.votes}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No created polls</p>
      )}
      <hr />
      <h3>Voted Polls</h3>
      {votedPolls.length > 0 ? (
        votedPolls.map((poll) => (
          <div key={poll._id}>
            <h4>{poll.question}</h4>
            <ul>
              {poll.options.map((option, index) => (
                <li key={index}>
                  {option.text}: {option.votes}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No voted polls</p>
      )}
    </div>
  );
};

export default UserProfile;
