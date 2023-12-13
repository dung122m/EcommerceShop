// getUserInfo.js
import axios from "axios";

const apiUrl = "http://localhost:8080/api/v2/users/self";
const accessToken =
  typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
const headers = accessToken
  ? {
      Authorization: `Bearer ${accessToken}`,
    }
  : {};

export const fetchData = async () => {
  try {
    const response = await axios.get(apiUrl, { headers });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
