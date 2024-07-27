import React, { useState } from "react";
import { AxiosInstance } from "../services/api";
import styles from "./PollCreate.module.css";

const PollCreate = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
  const [error, setError] = useState(null);

  const createPoll = async (poll) => {
    try {
      const response = await AxiosInstance.post("/polls", poll);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating poll:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { text: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const formattedOptions = options.filter(
        (option) => option.text.trim() !== ""
      );
      if (formattedOptions.length === 0) {
        throw new Error("At least one option is required.");
      }

      await createPoll({ question, options: formattedOptions });
      setQuestion("");
      setOptions([{ text: "" }, { text: "" }]);
    } catch (error) {
      setError("Failed to create poll. Please check your input and try again.");
      console.error(
        "Error creating poll:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        {options.map((option, index) => (
          <div className={styles.inputGroup} key={index}>
            <label>Option {index + 1}:</label>
            <input
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddOption}>
          Add Option
        </button>
        <button type="submit">Create Poll</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default PollCreate;
