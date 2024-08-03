import React, { useState, useEffect } from "react";
import { AxiosInstance } from "../services/api";
import io from "socket.io-client";

const CommentSection = ({ pollId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const socket = io("https://real-time-voting-app-mern.onrender.com");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await AxiosInstance.get(`/comments/${pollId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    socket.on("commentUpdate", (updatedComments) => {
      setComments(updatedComments);
    });

    fetchComments();

    return () => {
      socket.disconnect();
    };
  }, [pollId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post("/comments", {
        pollId,
        text,
      });

      setText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            {comment.createdBy ? (
              <strong>{comment.createdBy.name}:</strong>
            ) : (
              <strong>Unknown User:</strong>
            )}
            {` ${comment.text}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
