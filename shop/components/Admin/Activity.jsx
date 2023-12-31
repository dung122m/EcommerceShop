import React from "react";
import MainHeading from "./MainHeading";
import { tr } from "date-fns/locale";
const Transaction = [];
const Activity = () => {
  return (
    <div>
      <MainHeading title="Recent Order" />
      <div className="mt-4">
        <table className="table-auto flex flex-col divide-y-2">
          <thead className="px-6 py-2 bg-indigo-100">
            <tr className="text-gray-900 font-medium  text-sm grid grid-cols-5">
              <td className="col-span-2">Order</td>
              <td className="grid justify-items-end ">Amount</td>
              <td className=" grid justify-items-center">Status</td>
              <td className=" grid justify-items-end">Date</td>
            </tr>
          </thead>
          <tbody className="flex flex-col divide-y-2">
            {Transaction.map((transaction) => (
              <tr
                key={transaction.id}
                className="px-6 py-4 text-sm font-light text-[#84878a] grid grid-cols-5"
              >
                <td className="text-[#84878a] col-span-2 flex space-x-4 items-center">
                  <span>{transaction.receiver}</span>
                </td>
                <td className="grid justify-items-end ">
                  <span className="font-semibold text-gray-800">
                    {transaction.amount}{" "}
                    <span className="text-gray-500">VND</span>
                  </span>
                </td>
                <td className="grid justify-items-center">
                  <span
                    className={`
                  ${
                    transaction.status === "Success"
                      ? "text-green-800 bg-green-200"
                      : "text-gray-800 bg-gray-200"
                  } ${
                      transaction.status === "Processing" &&
                      "text-yellow-800 bg-yellow-100"
                    }
                        rounded-lg px-2 py-1 text-xs`}
                  >
                    {" "}
                    {transaction.status}
                  </span>
                </td>
                <td className="grid justify-items-end">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activity;
