import React from "react";
import OverView from "./OverView";
import Activity from "./Activity";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-y-8 bg-[#f3f4f6] px-8 py-12">
      <OverView />
      <Activity />
    </div>
  );
};

export default Dashboard;
