
import React, { useState, useEffect } from "react";
import { AxiosInstance } from "../services/api";
import CommentSection from "./CommentSection";
import styles from "./PollVote.module.css"; 

const PollVote = () => {
  const [polls, setPolls] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

 
  const fetchPolls = async () => {
    try {
      const response = await AxiosInstance.get("/polls");
      setPolls(response.data);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

 
  const handleVote = async (pollId) => {
    try {
      let response = await AxiosInstance.post(`/polls/${pollId}/vote`, {
        option: selectedOption,
      });

      setSelectedOption(""); 
      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert(error.response.data.message);
      }
      console.error("Error voting on poll:", error);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div className={styles.pollContainer}>
      <h2>Vote in a Poll</h2>
      {polls.map((poll) => (
        <div key={poll._id} className={styles.poll}>
          <h3 className={styles.pollTitle}>{poll.question}</h3>
          {poll.options.map((option) => (
            <div key={option.text} className={styles.option}>
              <input
                type="radio"
                name={`poll-${poll._id}`}
                value={option.text}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              {option.text}
            </div>
          ))}
          <button className={styles.voteButton} onClick={() => handleVote(poll._id)}>Vote</button>
          <CommentSection pollId={poll._id} />
        </div>
      ))}
    </div>
  );
};

export default PollVote;
