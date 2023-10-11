import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { AiOutlineUser } from "react-icons/ai";
import Wrapper from "@/components/Wrapper";

const apiUrl = "http://localhost:8080/api/v2/users/self";
const accessToken =
  typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

const headers = accessToken
  ? {
      Authorization: `Bearer ${accessToken}`,
    }
  : {};

const Profile = () => {
  const [data, setData] = useState(null);
  const [time, setTime] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    // Gửi yêu cầu API bằng Axios và lưu phản hồi vào state khi nó có sẵn.
    axios
      .get(apiUrl, { headers })
      .then((response) => {
        setData(response.data);
        const timestamp = response.data.data?.createdAt;
        const date = new Date(timestamp);
        const formattedDate = format(date, "dd MMMM yyyy");
        setTime(formattedDate);
        // Đặt dữ liệu trước vào biểu mẫu sửa đổi
        setFormData({
          firstName: response.data.data?.first_name || "",
          lastName: response.data.data?.last_name || "",
          password: response.data.data?.password || "",
          address: response.data.data?.address || "",
          phoneNumber: response.data.data?.phone_number || "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Create a request body with the updated data from formData
      const updatedData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        password: formData.password,
        address: formData.address,
        phone_number: formData.phoneNumber,
      };

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(updatedData),
      };

      const response = await fetch(apiUrl, requestOptions);

      if (response.ok) {
        // Update the UI with the updated user data
        const updatedUser = await response.json();
        setData((prevData) => ({
          ...prevData,
          data: {
            ...prevData.data,
            ...updatedUser,
          },
        }));

        // Exit the editing mode
        setIsEditing(false);
      } else {
        console.error("Error updating user:", response.text());
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-[100vh]">
      {data ? (
        <div>
          <Wrapper>
            <div className="flex lg:mt-10 justify-between">
              <div className="flex items-center gap-2">
                <AiOutlineUser size={70} />
                <div className="flex flex-col align">
                  <p className="text-3xl font-bold ">
                    {data.data.first_name} {data.data.last_name}
                  </p>
                  <p className="text-slate-600">Nike member since {time}</p>
                </div>
              </div>
              {isEditing ? (
                <button onClick={handleSaveClick}>Save</button>
              ) : (
                <button onClick={handleEditClick}>Edit</button>
              )}
            </div>
            {isEditing ? (
              <div className="mt-3 flex flex-col justify-center items-center">
                <h2 className="text-center mt-2 text-xl font-bold">
                  Edit User Information
                </h2>
                <form className="mt-5">
                  <div className="form-group">
                    <label
                      htmlFor="firstName"
                      className=" text-gray-700 font-bold mb-2 flex items-center gap-2"
                    >
                      First Name:
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="border border-gray-400 p-2 rounded-md pr-10 "
                    />
                  </div>
                  <div className="form-group">
                    <label
                      className=" text-gray-700 font-bold mb-2 flex items-center 
                  gap-2"
                      htmlFor="lastName"
                    >
                      Last Name:
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      className="border border-gray-400 p-2 rounded-md pr-10"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="password"
                      className=" text-gray-700 font-bold mb-2 flex items-center 
                  gap-2"
                    >
                      Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="border border-gray-400 p-2 rounded-md pr-10"
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="address"
                      className=" text-gray-700 font-bold mb-2 flex items-center 
                  gap-2"
                    >
                      Address:
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      className="border border-gray-400 p-2 rounded-md pr-10"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="phoneNumber"
                      className=" text-gray-700 font-bold mb-2 flex items-center 
                  gap-2"
                    >
                      Phone Number:
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      className="border  border-gray-400 p-2 rounded-md pr-10"
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
            ) : null}
          </Wrapper>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
