import LayoutAdmin from "@/components/Admin/LayoutAdmin";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaRegEdit, FaRegEye, FaSave, FaTimes } from "react-icons/fa";
import ProductModal from "@/components/ProductModal";
import LayoutShipper from "@/components/Shipper/LayoutShipper";
import Dashboard from "@/components/Shipper/Dashboard";

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
        `http://localhost:8080/api/v2/admins/shippers/get-shipping-orders`,
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
        <title>Shipper Dashboard</title>
      </Head>
      <Dashboard />
    </LayoutShipper>
  );
};

export default Index;
