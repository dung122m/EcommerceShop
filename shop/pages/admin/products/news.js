import LayoutAdmin from "@/components/LayoutAdmin";
import Head from "next/head";
import React from "react";

const news = () => {
  return (
    <LayoutAdmin>
      <Head>
        <title>Add new Product</title>
      </Head>
      <div className="flex flex-col gap-5">
        <h1 className="text-blue-900 mb-2 text-xl">New product</h1>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Product name"
          className=" border-2 p-1 border-gray-300 rounded-md px-1 focus:border-blue-900 w-1/2"
        />
        <label>Description</label>
        <textarea
          className="border-2 p-1 border-gray-300 rounded-md px-1 focus:border-blue-900  w-1/2"
          placeholder="description"
        ></textarea>
        <label>Price</label>
        <input
          type="number"
          placeholder="Price"
          className=" border-2 p-1 border-gray-300 rounded-md px-1 focus:border-blue-900 w-1/2"
        />
      </div>
    </LayoutAdmin>
  );
};

export default news;
