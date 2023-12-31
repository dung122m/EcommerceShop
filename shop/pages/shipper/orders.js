import LayoutAdmin from "@/components/Admin/LayoutAdmin";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaRegEdit, FaRegEye, FaSave, FaTimes } from "react-icons/fa";
import ProductModal from "@/components/ProductModal";
import LayoutShipper from "@/components/Shipper/LayoutShipper";

const dataStatus = [
  "Awaiting pickup",
  "Preparing order",
  "Picking up",
  "Order picked up",
  "Delivering",
  "Delivered successfully",
  "Delivery failed",
];

const Index = () => {
  const [users, setUsers] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [shippers, setShippers] = useState(null);
  const accessAdmin =
    typeof window !== "undefined" ? localStorage.getItem("accessAdmin") : null;
  const [status, setStatus] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const customStyles = {
    content: {
      width: "50%", // Set the width as needed
      maxWidth: "500px", // Optionally set a maximum width
      margin: "auto", // Center the modal horizontally
    },
  };
  const fetchUsers = async (page) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessAdmin}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      const response = await fetch(
        `http://localhost:8080/api/v2/admins/shippers/get-shipping-orders/`,
        requestOptions
      );

      const result = await response.json();
      const userData = result.data;

      setUsers(userData);
      setIsLoading(false);
      setTotalPages(userData?.metadata.total_pages);
    } catch (error) {
      console.log("error", error);
      if (error?.status === 401)
        return (window.location.href = "/shipper/orders");
    }
  };

  const fetchProductDetails = async (product) => {
    const axios = require("axios");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:8080/api/v2/orders/${product.id}/products-name/`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setProductDetails({ products: response.data.data, order: product });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStatus(null);
    setShipperSelected(null);
  };
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const [selectedProductId, setSelectedProductId] = useState(null);
  const handleViewProduct = (product) => {
    setSelectedProductId(product);
    setIsModalOpen(true);
  };

  useEffect(
    (data) => {
      if (selectedProductId !== null) {
        fetchProductDetails(selectedProductId);
      }
    },
    [selectedProductId]
  );

  const handleSave = async (data) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessAdmin}`);

      console.log(status);

      const requestOptionsStatus = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
          status: status ?? data?.status,
        }),
      };

      const resStatus = await fetch(
        `http://localhost:8080/api/v2/orders/${data.id}/change-status/`,
        requestOptionsStatus
      );

      if (resStatus.ok) {
        window.location.href = "/shipper/orders";
      } else {
        console.log("Error updating status:", resStatus.text());
      }
    } catch (error) {
      console.log("error", error);
      // window.location.href = "/admin/orders";
    }
  };

  return (
    <LayoutShipper>
      <Head>
        <title>Orders Management</title>
      </Head>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created by
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>

                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className=" bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>

                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users?.records?.map((user) => (
                <tr key={user.id}>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.customer_name !== null
                        ? user.customer_name
                        : "admin"}
                    </div>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    {user.price?.toLocaleString("vi-VN")}
                  </td>

                  <td className="px-2 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="text-sm text-gray-900">
                        {user.address}
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="text-sm text-gray-900">
                        {user.phone_number}
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="text-sm  text-gray-900">
                        {user.payment_method_id === 1 ? "COD" : "VNPay"}
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap ">
                    {isEdit && isEdit === user.id ? (
                      <select
                        id="status"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status ?? productDetails?.order?.status}
                        class="w-96 bg-gray-50 border my-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {dataStatus.map((name, i) => (
                          <option value={name} key={i}>
                            {name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-sm text-gray-900 ">
                        <div className="text-sm  text-gray-900">
                          {user.status}
                        </div>
                      </div>
                    )}
                  </td>

                  <td className="px-2 py-3 whitespace-nowrap">
                    {isEdit && isEdit === user.id ? (
                      <div className="flex flex-row gap-8">
                        <button
                          className="text-blue-500 flex items-center text-center"
                          onClick={() => handleSave(user)}
                        >
                          <FaSave />
                        </button>
                        <button
                          className="text-blue-500 flex items-center text-center"
                          onClick={() => setIsEdit(null)}
                        >
                          <FaTimes color="red" />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="text-blue-500 flex items-center text-center"
                        onClick={() => setIsEdit(user.id)}
                      >
                        <FaRegEdit />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </LayoutShipper>
  );
};

export default Index;
