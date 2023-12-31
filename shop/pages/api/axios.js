import axios from "axios";

const baseURL = "http://localhost:8080/api/v2";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  maxBodyLength: Infinity,
});

export default axiosInstance;
