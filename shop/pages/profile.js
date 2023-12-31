import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { AiOutlineUser } from "react-icons/ai";
import Wrapper from "@/components/Wrapper";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const handleSaveClick = async () => {
    try {
      // Tạo một đối tượng chứa các thông tin cần cập nhật từ formData
      const updatedData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        password: formData.password,
        phone_number: formData.phoneNumber,
      };

      // Gửi yêu cầu PUT để cập nhật thông tin người dùng
      const response = await axios.put(apiUrl, updatedData, { headers });

      // Kiểm tra nếu cập nhật thành công (response status code là 200)
      if (response.status === 200) {
        // Gọi lại API để lấy thông tin người dùng sau khi cập nhật
        const updatedResponse = await axios.get(apiUrl, { headers });
        setData(updatedResponse.data);

        // Chuyển người dùng ra khỏi chế độ chỉnh sửa
        setIsEditing(false);
        router.reload();
      } else {
        console.error("Cập nhật thông tin không thành công.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
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
                <button onClick={handleEditClick}>Edit Profile</button>
              )}
            </div>
            {isEditing ? (
              <div className="mt-3 flex flex-col justify-center items-center">
                <h2 className="text-center mt-2 text-xl font-bold">
                  Edit Profile
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
