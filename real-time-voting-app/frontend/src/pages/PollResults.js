import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { AxiosInstance } from "../services/api";
import styles from "./PollResults.module.css";

const PollResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const socket = io("https://real-time-voting-app-mern.onrender.com");

    const fetchResults = async () => {
      try {
        const response = await AxiosInstance.get("/polls");
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching poll results:", error);
      }
    };

    fetchResults();

    socket.on("pollUpdate", (updatedResults) => {
      console.log("Received updated poll results:", updatedResults);
      setResults(updatedResults);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className={styles.resultsContainer}>
      <h2>Poll Results</h2>
      {results.length === 0 ? (
        <p className={styles.noResults}>No results available.</p>
      ) : (
        results.map((result) => (
          <div key={result._id} className={styles.pollResult}>
            <h3 className={styles.pollTitle}>{result.question}</h3>
            <ul className={styles.optionList}>
              {result.options.map((option) => (
                <li key={option._id} className={styles.optionItem}>
                  {option.text}: {option.votes}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default PollResults;
