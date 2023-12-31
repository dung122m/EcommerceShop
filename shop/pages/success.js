// success.js
import React, { useEffect } from "react";
import Head from "next/head";
import { MdCheckCircle } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { resetCart } from "@/store/cartSlice";

const Success = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const vnp_ResponseCode = localStorage.getItem("vnp_ResponseCode");

  useEffect(() => {
    const hasQueryParameters = Object.keys(router.query).length > 0;

    if (hasQueryParameters) {
      const { vnp_ResponseCode } = router.query;
      localStorage.setItem("vnp_ResponseCode", vnp_ResponseCode);

      const dataOder = JSON.parse(localStorage.getItem("dataOrder"));
      if (vnp_ResponseCode && vnp_ResponseCode === "00") {
        const axios = require("axios");
        let data = JSON.stringify({
          vnp_ResponseCode: vnp_ResponseCode,
          email: dataOder.email,
          phone_number: dataOder.phone_number,
          address: dataOder.address,
          payment_method_id: 2,
          order: dataOder.order,
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
              localStorage.removeItem("dataOrder");
              dispatch(resetCart());
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [router.query]);
  return (
    <div>
      <Head>
        <title>Payment Success</title>
      </Head>
      {/* {vnp_ResponseCode !== "01"} */}
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 flex items-center mb-8">
          <MdCheckCircle className="text-green-500 text-6xl mr-4" />
          <div>
            <h1 className="text-3xl font-semibold mb-4">Payment Successful!</h1>
            <p className="text-lg">
              Thank you for your purchase. Your payment has been successfully
              processed.
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Success;
