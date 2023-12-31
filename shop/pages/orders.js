import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

const Order = () => {
  const accessToken = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async (accessToken) => {
    try {
      const api = axios.create({
        baseURL: "http://localhost:8080/api/v2/",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const response = await api.get("users/get-orders-no-paginate");

      const orderIds = response.data.data.records.map((order) => order.id);
      const productResponses = await Promise.all(
        orderIds.map((orderId) => api.get(`orders/${orderId}/products-name`))
      );

      const orders = response.data.data.records.map((order, index) => ({
        ...order,
        order: productResponses[index].data.data,
      }));

      return orders;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData(accessToken)
      .then((orders) => {
        setOrders((prev) => ({
          ...prev,
          orders,
        }));
      })
      .catch((error) => {
        // Handle error if needed
      });
  }, [accessToken]);

  const moneyFormat = (price) => {
    const money = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
    return money;
  };
  return (
    <div className="w-full md:py-20 min-h-screen">
      <Head>
        <title>Order Items</title>
      </Head>

      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="flex flex-col gap-3 px-5">
          {orders?.orders?.map((order, i) => (
            <div
              key={i}
              class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 text-gray-900"
            >
              <div class="flex items-center justify-between mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900 ">
                  {moment(order.createdAt).format("llll")}
                </h5>
              </div>
              <div class="flow-root text-gray-900">
                <ul
                  role="list"
                  class="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {order?.order?.map((product) => (
                    <li class="py-3 sm:py-4">
                      <div class="flex items-center">
                        <div class="flex-shrink-0">
                          <img
                            class="w-16 h-16 rounded-full"
                            src={product.Variant?.Product.main_image}
                            alt="Neil image"
                          />
                        </div>
                        <div class="flex-1 min-w-0 ms-4">
                          <p class="text-sm font-medium text-gray-900 truncate ">
                            {product.Variant?.Product.name}
                          </p>
                        </div>
                        <div class="inline-flex items-center text-sm  text-gray-900 ">
                          {product?.quantity} x
                        </div>
                        <div class="inline-flex items-center text-base font-xl text-gray-900 ">
                          {" "}
                          {moneyFormat(
                            product?.Variant?.Product?.original_price
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col mt-5">
                <div class="border-t border-gray-500"></div>
                <div className="flex float-right  gap-3 w-10 my-2">
                  Customer: <b>{order.customer_name}</b>
                </div>
                <div className="flex float-right  gap-3">
                  Phone: <b>{order.phone_number}</b>
                </div>
                <div className="flex float-right  gap-3">
                  Address: <b>{order.address}</b>
                </div>
                <div className="flex float-right  gap-3 mb-2">
                  Order Status: <b>{order.status}</b>
                </div>

                <div class="border-t border-gray-500"></div>
                <div className="flex float-right  gap-3 my-2">
                  Total order: <b>{order.total_order_amount}</b>
                </div>
                <div className="flex float-right  gap-3">
                  Total Price: <b>{moneyFormat(order.price)}</b>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div class="w-full m-5 p-4  bg-white border border-gray-200 rounded-lg shadow sm:p-8 ">
        <div className=" flex flex-row gap-3">
          <h2>Total Expenditure: </h2>
          <h1 className="text-lg">
            {orders && orders.orders
              ? moneyFormat(orders.orders.reduce((a, b) => a + b.price, 0))
              : "0 VND"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Order;
