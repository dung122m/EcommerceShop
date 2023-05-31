import React from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import Head from "next/head";
import CartItem from "@/components/CartItem";
import { useSelector } from "react-redux";
const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="w-full md:py-20">
      <Head>
        <title>Bag. Store.</title>
      </Head>
      <Wrapper>
        {cartItems.length > 0 && (
          <>
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* cart item start */}
              <div className="flex-[2]">
                <div className="text-lg font-semibold">Bag</div>
                {cartItems.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </div>
              {/* cart item end */}

              {/* sumary start */}
              <div className="flex-[1] font-semibold">
                <div className="text-lg font-semibold">Summary</div>
                <div className="p-5 my-5  border-b flex flex-col">
                  <div className="flex justify-between">
                    <div className=" text-md mg:text-lg font-medium text-black ">
                      Subtotal{" "}
                    </div>
                    <div>3.290.000đ</div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className=" text-md mg:text-lg font-medium text-black ">
                      Estimated Delivery & Handling
                    </div>
                    <div>250.000đ</div>
                  </div>
                </div>
                <div className="flex p-5 border-b my-5 justify-between">
                  <div className="font-medium">Total</div>
                  <div>3.290.000đ</div>
                </div>
                <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">
                  Check Out
                </button>
              </div>

              {/* sumary end */}
            </div>
          </>
        )}
        {cartItems.length < 1 && (
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <Image
              src="/empty-cart.jpg"
              width={300}
              height={300}
              className="w-[300px] md:w-[400px]"
            />
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your cart.
              <br />
              Go ahead and explore top categories.
            </span>
            <Link
              href="/"
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
