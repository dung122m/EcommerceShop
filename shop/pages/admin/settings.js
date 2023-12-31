import LayoutAdmin from "@/components/Admin/LayoutAdmin";
import Head from "next/head";
import { useState } from "react";

const initialData = {
  username: "",
  password: "",
  full_name: "",
  role: "",
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addFormData, setAddFormData] = useState(initialData);
  const [role, setRole] = useState("supperadmin");

  const accessAdmin =
    typeof window !== "undefined" ? localStorage.getItem("accessAdmin") : null;

  const handleAddFormChange = (e) => {
    setAddFormData({
      ...addFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    const data = {
      ...addFormData,
      role,
    };
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessAdmin}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify(data),
      };
      console.log(data);
      const response = await fetch(
        "http://localhost:8080/api/v2/admins",
        requestOptions
      );

      console.log(response);

      if (response.ok) {
        setAddFormData(initialData);
      } else {
        console.log("Error adding user:", response.text());
      }
    } catch (error) {
      console.log("error", error);
      window.location.href = "/admin/settings";
    }
  };

  return (
    <LayoutAdmin>
      <Head>
        <title>Create </title>
      </Head>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow">
            <div>
              <form>
                <label className="block mb-1">
                  Full Name:
                  <input
                    type="text"
                    name="full_name"
                    defaultValue={addFormData.full_name}
                    onChange={handleAddFormChange}
                    className="border border-gray-400 p-1 rounded w-full"
                  />
                </label>
                <br />
                <label className="block mb-1">
                  UserName:
                  <input
                    type="text"
                    name="username"
                    defaultValue={addFormData.username}
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
                    defaultValue={addFormData.password}
                    onChange={handleAddFormChange}
                    className="border border-gray-400 p-1 rounded w-full"
                  />
                </label>
                <br />
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select an role
                </label>
                <select
                  onChange={(e) => setRole(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option selected value={"supperadmin"} className="py-1 px-1">
                    Admin
                  </option>
                  <option value="shipper" className="py-1 px-1">
                    Shipper
                  </option>
                </select>

                <button
                  type="submit"
                  onClick={handleAdd}
                  className="w-full bg-blue-600 px-3 py-1 text-white rounded-md mt-5 flex justify-center items-center"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default Index;
