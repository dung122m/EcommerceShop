import React from "react";
import Sidebar from "./Sidebar";
import ProfileWrapper from "./ProfileWrapper";
import Dashboard from "./Dashboard";

const AdminApp = ({ children }) => {
  return (
    <div className="flex items-center justify-center mx-auto min-h-screen lg:max-w-7xl border border-gray-200 rounded-md overflow-hidden mt-16">
      <div className="grid grid-cols-4 space-x-4 w-full ">
        <Sidebar />

        <div className="col-span-3">
          <ProfileWrapper />
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminApp;
