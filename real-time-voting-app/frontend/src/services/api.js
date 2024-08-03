import axios from "axios";

const API_URL = "https://real-time-voting-app-mern.onrender.com/api";

const commonHeaders = {
  Authorization: localStorage.getItem("token"),
};

export const AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    ...commonHeaders,
    "Content-Type": "application/json",
  },
});
