import React, { useEffect } from "react";

const Profile = ({ data }) => {
  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("access_token");

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v2/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào tiêu đề (header)
            },
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <div>{data}</div>;
};

export default Profile;
