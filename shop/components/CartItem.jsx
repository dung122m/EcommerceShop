import Link from "next/link";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateCart } from "@/store/cartSlice";
const CartItem = ({ data }) => {
  const mutableArr = [...data.variants];
  const updateCartItem = (e, key) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
    };
  };

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* image start */}

      <div className="shrink-0 aspect-square w-[50px] md:w-[120px] ">
        <Link href={`/products/${data.product.id}`}>
          <img src={data.product.main_image} alt="" />
        </Link>
      </div>
      {/* image end */}
      <div className="w-full flex flex-col">
        <div className="flex flex-col justify-between">
          {/* product title */}
          <Link href={`/products/${data.product.id}`}>
            <div className="text-lg  font-semibold text-black/[0.8]">
              {data.product.name}
            </div>
          </Link>
          <div className="text-sm md:text-md font-medium text-black/[0.5] block ">
            {data?.product.Categories[1]?.name
              ? data.product?.Categories[1]?.name
              : data.product?.Categories[0]?.name}
          </div>
          {/* product subtittle */}

          {/* product color */}

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3  text-black/[0.5]">
              <div className="flex items-center gap-1">
                <div className="font-semibold">Size</div>
                <select
                  className="hover:text-black"
                  onChange={(e) => {
                    updateCartItem(e, "selectedSize");
                  }}
                >
                  {mutableArr.reverse().map((size, i) => (
                    <option
                      value={size.size}
                      key={i}
                      selected={data?.selectedSize === size.size}
                    >
                      {size.size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="font-semibold">Quantity</div>
              <select className="hover:text-black">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => (
                  <option
                    index={i}
                    value={q}
                    selected={data.quantity === q}
                    onChange={(e) => {
                      updateCartItem(e, "quantity");
                    }}
                  >
                    {q}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <RiDeleteBin6Line className="cursor-pointer mt-3 text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" />
        </div>
      </div>
      {/* product price */}
      <div className="font-semibold">
        {data.product.current_price.toLocaleString("vi-VN") + " VND"}
      </div>
    </div>
  );
};

export default CartItem;
