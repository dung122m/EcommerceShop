import React from "react";

import Activity from "./Activity";

import Charts from "./Charts";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-y-8 bg-[#f3f4f6] px-8 py-12">
      <Charts />
      {/* <Activity /> */}
    </div>
  );
};

export default Dashboard;
