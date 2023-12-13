import NavAdmin from "@/components/Shipper/NavShipper";
import Head from "next/head";
import React from "react";

const LayoutShipper = ({ children }) => {
  return (
    <div className="flex bg-blue-700 min-h-screen">
      <Head>
        <title>Shipper Page</title>
      </Head>
      <NavAdmin />
      <div className="bg-white flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">
        {children}
      </div>
    </div>
  );
};

export default LayoutShipper;
