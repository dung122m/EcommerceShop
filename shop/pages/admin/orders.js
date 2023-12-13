import LayoutAdmin from "@/components/Admin/LayoutAdmin";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaRegEye } from "react-icons/fa";
import ProductModal from "@/components/ProductModal";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const accessAdmin =
    typeof window !== "undefined" ? localStorage.getItem("accessAdmin") : null;
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        redirect: "follow",
      };

      const response = await fetch(
        `http://localhost:8080/api/v2/orders?page=${page}&limit=10&sort=asc&orderBy=createdAt`,
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
  const fetchProductDetails = async (productId) => {
    const axios = require("axios");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:8080/api/v2/orders/${productId}/products-name/`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setProductDetails(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const [selectedProductId, setSelectedProductId] = useState(null);
  const handleViewProduct = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (selectedProductId !== null) {
      fetchProductDetails(selectedProductId);
    }
  }, [selectedProductId]);
  return (
    <LayoutAdmin>
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
                  ID
                </th>
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
              {users.records.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.customer_name !== null
                        ? user.customer_name
                        : "admin"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.price.toLocaleString("vi-VN")}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="text-sm text-gray-900">
                        {user.address}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="text-sm text-gray-900">
                        {user.payment_method_id === 1 ? "COD" : "VNPay"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="text-sm text-gray-900">{user.status}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-blue-500 flex items-center text-center"
                      onClick={() => handleViewProduct(user.id)}
                    >
                      <FaRegEye />
                    </button>
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
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        portalClassName="modal"
        productDetails={productDetails}
        style={{
          width: "50%", // Set the width as needed
          maxWidth: "500px", // Optionally set a maximum width
          margin: "auto", // Center the modal horizontally
        }}
      />
    </LayoutAdmin>
  );
};

export default Index;
