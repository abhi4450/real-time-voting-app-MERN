import axios from "axios";

const API_URL = "http://localhost:5000/api";

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
