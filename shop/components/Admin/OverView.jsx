import React from "react";
import { Ri24HoursLine } from "react-icons/ri";
import MainHeading from "./MainHeading";
const Statements = [
  {
    id: "accountBalance",
    name: "Account Balance",
    icon: <Ri24HoursLine size={30} />,
    amount: "$123123",
    href: "#",
  },
  {
    id: "pending",
    name: "Pending",
    icon: <Ri24HoursLine size={30} />,
    amount: "$-123.123",
    href: "#",
  },
  {
    id: "processed",
    name: "Processed",
    icon: <Ri24HoursLine size={30} />,
    amount: "$123.123.123",
    href: "#",
  },
];
const OverView = () => {
  return (
    <div className="">
      <MainHeading title="Overview" />
      <div className="lg:flex lg:space-x-8 mt-4 sm:grid sm:gap-y-4">
        {Statements.map((statement) => (
          <div
            key={statement.id}
            className="grid grid-cols-1 border border-gray-200 rounded-lg w-[360px]  bg-white
            shadow-md"
          >
            <div className="flex space-x-4 items-center py-4">
              <div className="text-gray-600 mx-4 flex items-center">
                {statement.icon}
              </div>
              <div>
                <div className="text-sm text-gray-400 font-light">
                  {statement.name}
                </div>
                <div className="text-gray-800 font-bold">
                  {statement.amount}
                </div>
              </div>
            </div>
            <button className="text-indigo-600 hover:text-indigo-700 flex items-start bg-indigo-50 pl-4 py-2">
              View All
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverView;
