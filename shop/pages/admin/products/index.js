import { useGetProductsQuery } from "@/api/productApi";
import LayoutAdmin from "@/components/Admin/LayoutAdmin";
import Loading from "@/components/Loading";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem("accessAdmin"));

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `http://localhost:8080/api/v2/products?page=${page}&limit=10&sort=asc&orderBy=id`,
        requestOptions
      );

      const result = await response.json();
      const userData = result.data;

      setUsers(userData);
      setIsLoading(false);
      setTotalPages(userData?.metadata.total_pages);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <LayoutAdmin>
      <Head>
        <title>Products Management</title>
      </Head>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>

                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Original Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.records.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.name}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.current_price.toLocaleString("vi-VN")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.original_price.toLocaleString("vi-VN")}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-center fixed bottom-10 right-10">
            <ReactPaginate
              pageCount={totalPages}
              onPageChange={handlePageChange}
              containerClassName="flex justify-center mt-8 gap-5"
              pageClassName="px-2 py-1 bg-gray-200 text-gray-800 rounded-md cursor-pointer hover:bg-gray-300"
              previousClassName="px-2 py-1 bg-gray-200 text-gray-800 rounded-md cursor-pointer hover:bg-gray-300"
              nextClassName="px-2 py-1 bg-gray-200 text-gray-800 rounded-md cursor-pointer hover:bg-gray-300"
              activeClassName="bg-green-500 text-white"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default Index;
