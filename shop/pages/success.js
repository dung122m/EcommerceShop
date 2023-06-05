// success.js
import React from "react";
import Head from "next/head";
import { MdCheckCircle } from "react-icons/md";

const Success = () => {
  return (
    <div>
      <Head>
        <title>Payment Success</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 flex items-center">
          <MdCheckCircle className="text-green-500 text-6xl mr-4" />
          <div>
            <h1 className="text-3xl font-semibold mb-4">Payment Successful!</h1>
            <p className="text-lg">
              Thank you for your purchase. Your payment has been successfully
              processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
