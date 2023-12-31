import NavAdmin from "@/components/Admin/NavAdmin";
import { store } from "@/store/store";
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";

const LayoutAdmin = ({ children }) => {
  return (
    <div className="flex bg-blue-700 min-h-screen">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <NavAdmin />
      <div className="bg-white flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">
        {children}
      </div>
    </div>
  );
};

export default LayoutAdmin;
