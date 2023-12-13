// ProductModal.js

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
const formatCreatedAt = (createdAt) => {
  const dateObject = new Date(createdAt);
  const formattedDate = dateObject.toLocaleString("vi-VN"); // Định dạng theo ngôn ngữ Việt Nam
  return formattedDate;
};
const ProductModal = ({ isOpen, onClose, productDetails }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h1 className="text-center text-xl font-bold">Order Details</h1>

      {productDetails ? (
        productDetails.map((value) => {
          console.log(value);
          return (
            <div key={value.id} className="flex items-center">
              {" "}
              <div className="shrink-0 aspect-square w-[50px] md:w-[120px] mr-5">
                <img src={value.Variant.Product.main_image} alt="" />
              </div>
              <div className="mt-2">
                <div>
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
      <button
        className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 px-2 py-1 text-white rounded-md"
        onClick={onClose}
      >
        Close
      </button>
    </Modal>
  );
};

export default ProductModal;
