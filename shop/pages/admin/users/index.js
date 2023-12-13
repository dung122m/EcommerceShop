import LayoutAdmin from "@/components/Admin/LayoutAdmin";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaRegWindowClose, FaSave } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
const Index = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const accessAdmin =
    typeof window !== "undefined" ? localStorage.getItem("accessAdmin") : null;
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone_number: "",
  });
  const [addFormData, setAddFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone_number: "",
  });
  const fetchUsers = async (page) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessAdmin}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `http://localhost:8080/api/v2/users?page=${page}&limit=10&sort=asc&orderBy=id`,
        requestOptions
      );

      const result = await response.json();
      const userData = result.data;

      setUsers(userData);
      setIsLoading(false);
      setTotalPages(userData?.metadata.total_pages);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const handleAddButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleAddUser = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessAdmin}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify(addFormData),
      };

      const response = await fetch(
        "http://localhost:8080/api/v2/users",
        requestOptions
      );

      if (response.ok) {
        const newUser = await response.json();
        setUsers([...users, newUser.data]);
        setAddFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
        });
      } else {
        console.log("Error adding user:", response.text());
      }
    } catch (error) {
      console.log("error", error);
      window.location.href = "/admin/users";
    }
  };
  const handleSaveEdit = async (userId) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessAdmin}`);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify(editFormData),
      };

      const response = await fetch(
        `http://localhost:8080/api/v2/users/${userId}`,
        requestOptions
      );

      if (response.ok) {
        const updatedUser = await response.json();
        const updatedUsers = users.map((user) => {
          if (user.id === userId) {
            return updatedUser;
          }
          return user;
        });

        setUsers(updatedUsers);
        setEditingUserId(null);
        setEditFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
        });
      } else {
        console.log("Error updating user:", response.text());
      }
    } catch (error) {
      console.log("error", error);
      window.location.href = "/admin/users";
    }
  };

  const handleAddFormChange = (e) => {
    setAddFormData({
      ...addFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handleEditClick = (user) => {
    setEditFormData({
      first_name: user.first_name,
      last_name: user.last_name,

      phone_number: user.phone_number,
    });
    setEditingUserId(user.id);
  };
  const handleDeleteUser = async (userId) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessAdmin}`);

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `http://localhost:8080/api/v2/users/${userId}`,
        requestOptions
      );

      if (response.ok) {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);

        console.log("Updated Users:", updatedUsers);
      } else {
        console.log("Error deleting user:", response.text());
      }
    } catch (error) {
      console.log("error", error);
      window.location.href = "/admin/users";
    }
  };
  return (
    <LayoutAdmin>
      <Head>
        <title>Users Management</title>
      </Head>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left  text-gray-500 uppercase tracking-wider">
                  {" "}
                  {!isFormVisible && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mb-4"
                      onClick={handleAddButtonClick}
                    >
                      <IoIosAddCircleOutline />
                    </button>
                  )}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users?.records.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        name="phone_number"
                        value={editFormData.phone_number}
                        onChange={handleEditFormChange}
                        className="border border-gray-300 px-2 py-1 rounded-md"
                      />
                    ) : (
                      <div className="text-sm text-gray-900">
                        {user.phone_number}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        name="address"
                        value={editFormData.address}
                        onChange={handleEditFormChange}
                        className="border border-gray-300 px-2 py-1 rounded-md"
                      />
                    ) : (
                      <div className="text-sm text-gray-900">
                        {user.address}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        name="first_name"
                        value={editFormData.first_name}
                        onChange={handleEditFormChange}
                        className="border border-gray-300 px-2 py-1 rounded-md"
                      />
                    ) : (
                      <div className="text-sm text-gray-900">
                        {user.first_name}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        name="last_name"
                        value={editFormData.last_name}
                        onChange={handleEditFormChange}
                        className="border border-gray-300 px-2 py-1 rounded-md"
                      />
                    ) : (
                      <div className="text-sm text-gray-900">
                        {user.last_name}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUserId === user.id ? (
                      <div>
                        <button
                          onClick={() => handleSaveEdit(user.id)}
                          className="text-blue-500 px-2 py-1 rounded-md ml-2"
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={() => setEditingUserId(null)}
                          className="bg-gray-300 text-gray-800 px-2 py-1 rounded-md ml-2"
                        >
                          <FaRegWindowClose />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => handleEditClick(user)}
                        >
                          <CiEdit />
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <MdDeleteOutline />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isFormVisible && (
            <div
              className="fixed inset-0 bg-black opacity-50 cursor-pointer"
              onClick={() => setIsFormVisible(false)}
            ></div>
          )}
          {isFormVisible && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow">
              <div>
                <form>
                  <label className="block mb-1">
                    First Name:
                    <input
                      type="text"
                      name="first_name"
                      value={addFormData.first_name}
                      onChange={handleAddFormChange}
                      className="border border-gray-400 p-1 rounded w-full"
                    />
                  </label>
                  <br />
                  <label className="block mb-1">
                    Last Name:
                    <input
                      type="text"
                      name="last_name"
                      value={addFormData.last_name}
                      onChange={handleAddFormChange}
                      className="border border-gray-400 p-1 rounded w-full"
                    />
                  </label>
                  <br />
                  <label className="block mb-1">
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={addFormData.email}
                      onChange={handleAddFormChange}
                      className="border border-gray-400 p-1 rounded w-full"
                    />
                  </label>
                  <br />
                  <label className="block mb-1">
                    Address:
                    <input
                      type="text"
                      name="address"
                      value={addFormData.address}
                      onChange={handleAddFormChange}
                      className="border border-gray-400 p-1 rounded w-full"
                    />
                  </label>
                  <br />
                  <label className="block mb-1">
                    Phone Number:
                    <input
                      type="text"
                      name="phone_number"
                      value={addFormData.phone_number}
                      onChange={handleAddFormChange}
                      className="border border-gray-400 p-1 rounded w-full"
                    />
                  </label>
                  <br />
                  <label className="block mb-1">
                    Password
                    <input
                      type="password"
                      name="password"
                      value={addFormData.password}
                      onChange={handleAddFormChange}
                      className="border border-gray-400 p-1 rounded w-full"
                    />
                  </label>
                  <br />
                  <div>
                    <button
                      type="button"
                      onClick={handleAddUser}
                      className="bg-blue-600 px-3 py-1 text-white rounded-md mt-2 flex justify-center items-center"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
              {/* {isFormVisible && (
                <div className="fixed inset-0 bg-black opacity-50"></div>
              )} */}
            </div>
          )}
          <div className="flex items-center justify-center fixed bottom-10 right-10">
            <ReactPaginate
              pageCount={totalPages}
              onPageChange={handlePageChange}
              containerClassName="flex justify-center mt-8 gap-5"
              pageClassName="px-2 py-1 bg-gray-200 text-gray-800 rounded-md cursor-pointer hover:bg-gray-300"
              previousClassName="px-2 py-1 bg-gray-200 text-gray-800 rounded-md cursor-pointer hover:bg-gray-300"
              nextClassName="px-2 py-1 bg-gray-200 text-gray-800 rounded-md cursor-pointer hover:bg-gray-300"
              activeClassName="bg-green-500 text-white"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default Index;
