// Trang Checkout
import { useRouter } from "next/router";
import Wrapper from "@/components/Wrapper";
import { fetchData } from "@/utils/getUserInfo";
import Head from "next/head";
import { useDispatch } from "react-redux";

import OrderItem from "@/components/OrderItem";
import { useEffect, useMemo, useState } from "react";
import { resetCart } from "@/store/cartSlice";

const accessToken =
  typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
const Checkout = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const [address, setAddress] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const { cartItems } = router.query;
  const [vnpayUrl, setVnpayUrl] = useState("");
  const parsedCartItems = JSON.parse(cartItems || "[]");
  const total = useMemo(() => {
    return parsedCartItems.reduce(
      (total, val) => total + val.product.current_price,
      0
    );
  }, [cartItems]);
  const quantityArray = parsedCartItems.map((item) => {
    const selectedVariantId = item.variants.find(
      (variant) => variant.size === item.selectedSize
    )?.id;

    return {
      variant_id: selectedVariantId,
      quantity: item.quantity,
    };
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const handleCheckOutGuest = () => {
    if (paymentMethod === "COD") {
      const axios = require("axios");
      let data = JSON.stringify({
        email: email,
        phone_number: phone,
        address: address,
        payment_method_id: 1,
        order: quantityArray,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/api/v2/orders/guest",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          if (response.data.status === 200) {
            router.push("/success");
            dispatch(resetCart());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (paymentMethod === "VNPay") {
      const axios = require("axios");
      let data = JSON.stringify({
        total_order_amount: total,

        price: parsedCartItems.length,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/api/v2/orders/vnpay",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.status === 200) {
            window.location.href = response.data.data;

            localStorage.setItem(
              "dataOrder",
              JSON.stringify({
                email: email,
                phone_number: phone,
                address: address,
                payment_method_id: 1,
                order: quantityArray,
              })
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleCheckOut = () => {
    if (paymentMethod === "COD") {
      const axios = require("axios");
      let data = JSON.stringify({
        email: email,
        phone_number: phone,
        address: address,
        payment_method_id: 1,
        order: quantityArray,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/api/v2/orders/user",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          if (response.data.status === 200) {
            router.push("/success");
            dispatch(resetCart());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (paymentMethod === "VNPay") {
      const axios = require("axios");
      let data = JSON.stringify({
        // total_order_amount: parsedCartItems.length,
        total_order_amount: total,

        price: parsedCartItems.length,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/api/v2/orders/vnpay",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.status === 200) {
            window.location.href = response.data.data;

            localStorage.setItem(
              "dataOrder",
              JSON.stringify({
                email: email,
                phone_number: phone,
                address: address,
                payment_method_id: 1,
                order: quantityArray,
              })
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        if (!accessToken) {
          setName("");
          setPhone("");
          setAddress("");
          return;
        }
        const data = await fetchData();
        setName(data.first_name + " " + data.last_name);
        setPhone(data.phone_number);
        setAddress(data.address);
        setEmail(data.email);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataFromAPI();
  }, []);
  return (
    <div className="w-full md:py-20 min-h-screen">
      <Head>
        <title>Bag. Store.</title>
      </Head>
      <Wrapper>
        {parsedCartItems.length > 0 && (
          <>
            <div className="flex ">
              <div className="flex flex-col  gap-5 py-10 mr-10">
                {/* cart item start */}
                <div className="flex-[2]">
                  <div className="text-lg font-semibold">Order</div>
                  {parsedCartItems.map((item) => (
                    <OrderItem key={item.id} data={item} />
                  ))}
                </div>
                {/* cart item end */}

                {/* sumary start */}
                <div className="flex-[1] font-semibold ">
                  <div className="text-lg font-semibold">Summary</div>
                  <div className="p-5 my-5 flex flex-col">
                    <div className="flex justify-between">
                      <div className=" text-md mg:text-lg font-medium text-black ">
                        Total{" "}
                      </div>
                      <div>{total.toLocaleString("vi-VN") + " VND"}</div>
                    </div>
                  </div>
                </div>

                {/* sumary end */}
              </div>
              <div className="py-10 w-1/2">
                <div className="text-lg font-semibold mb-2">
                  Order Information
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Name"
                    className="w-full border border-gray-400 p-2 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="Phone Number"
                    className="w-full border border-gray-400 p-2 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    value={address}
                    placeholder="Address"
                    className="w-full border border-gray-400 p-2 rounded-md"
                  />
                </div>
                <div className="flex justify-between my-5">
                  <span className="text-lg">Payment method</span>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="COD">Cash On Delivery </option>
                    <option value="VNPay">VNPay</option>
                  </select>
                </div>
                {accessToken ? (
                  <button
                    className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                    onClick={handleCheckOut}
                  >
                    Check Out
                  </button>
                ) : (
                  <button
                    className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                    onClick={handleCheckOutGuest}
                  >
                    Check Out
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </Wrapper>
    </div>
  );
};

export default Checkout;
