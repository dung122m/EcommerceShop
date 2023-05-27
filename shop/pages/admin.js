import NavAdmin from "@/components/NavAdmin";
import React from "react";

const admin = () => {
  return (
    <div className="flex bg-blue-700 min-h-screen">
      <NavAdmin />
      <div className="bg-white flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">
        hello
      </div>
    </div>
  );
};

export default admin;
