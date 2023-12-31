// ProductModal.js

import React, { useState } from "react";
import Modal from "react-modal";
const formatCreatedAt = (createdAt) => {
  const dateObject = new Date(createdAt);
  const formattedDate = dateObject.toLocaleString("vi-VN"); // Định dạng theo ngôn ngữ Việt Nam
  return formattedDate;
};

const dataStatus = [
  "Awaiting pickup",
  "Preparing order",
  "Picking up",
  "Order picked up",
  "Delivering",
  "Delivered successfully",
  "Delivery failed",
];

const ProductModal = ({
  isOpen,
  onClose,
  productDetails,
  status,
  setStatus,
  shippers,
  shipperSelected,
  setShipperSelected,
}) => {
  const accessAdmin =
    typeof window !== "undefined" ? localStorage.getItem("accessAdmin") : null;
  const handleUpdateStatus = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessAdmin}`);

      const requestOptionsStatus = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
          status: status ?? productDetails?.order?.status,
        }),
      };

      const requestOptionsShippe = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
          shipper_id:
            shipperSelected ||
            productDetails?.order?.shipper_id ||
            shippers[0]?.id,
        }),
      };

      const resStatus = await fetch(
        `http://localhost:8080/api/v2/orders/${productDetails.order.id}/change-status/`,
        requestOptionsStatus
      );

      const resShipper = await fetch(
        `http://localhost:8080/api/v2/orders/${productDetails.order.id}/assign-shipper/`,
        requestOptionsShippe
      );

      if (resStatus.ok && resShipper.ok) {
        alert("Status updated successfully");
        window.location.href = "/admin/orders";
      } else {
        console.log("Error updating status:", resStatus.text());
      }
    } catch (error) {
      console.log("error", error);
      // window.location.href = "/admin/orders";
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className="flex flex-col">
        <h1 className="text-center text-xl font-bold">Order Details</h1>

        <div>
          {productDetails?.products ? (
            productDetails?.products.map((value) => {
              return (
                <div key={value.id} className="flex items-center">
                  <div className="shrink-0 aspect-square w-[50px] md:w-[120px] mr-5">
                    <img src={value.Variant.Product.main_image} alt="" />
                  </div>
                  <div className="mt-2">
                    <div className="font-bold">
                      {value.Variant.Product.name} x {value.quantity}
                    </div>
                    <div>Size: {value.Variant.size}</div>

                    <div>Created At: {formatCreatedAt(value.createdAt)} </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Loading product details...</p>
          )}
        </div>

        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex flex-row  items-center gap-5">
            <h1 class="w-[100]">Shipper</h1>

            <select
              id="order"
              onChange={(e) => setShipperSelected(e.target.value)}
              value={
                shipperSelected ?? productDetails?.order?.assigned_to_shipper
              }
              class=" w-96 bg-gray-50 border my-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {shippers?.map((shipper, i) => (
                <option value={shipper.id} key={i}>
                  {shipper.full_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row items-center gap-5">
            <h1>Status</h1>
            <select
              id="status"
              onChange={(e) => setStatus(e.target.value)}
              value={status ?? productDetails?.order?.status}
              class="w-96 bg-gray-50 border my-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {dataStatus.map((name, i) => (
                <option value={name} key={i}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row justify-center">
            <button
              className="  mt-4 mr-4 bg-red-500 px-2 py-1 text-white rounded-md"
              onClick={onClose}
            >
              Close
            </button>

            <button
              className="  mt-4 mr-4 bg-green-500 px-2 py-1 text-white rounded-md"
              onClick={handleUpdateStatus}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
