import Link from "next/link";
import React, { useMemo } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateCart, removeFromCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ data }) => {
  const mutableArr = [...data.variants];
  const dispatch = useDispatch();

  const updateCartItem = (e, key) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: data?.product?.id,
    };
    if (key === "selectedSize") {
      const selectedProduct = data.variants.find(
        (variant) => variant.size === e.target.value
      );
      payload.id = selectedProduct.product.id;
    }
    dispatch(updateCart(payload));
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
              <select
                className="hover:text-black"
                onChange={(e) => {
                  updateCartItem(e, "quantity");
                }}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                  return (
                    <option key={i} value={q} selected={data.quantity === q}>
                      {q}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <RiDeleteBin6Line
            className="cursor-pointer mt-3 text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
            onClick={() => dispatch(removeFromCart({ id: data.product.id }))}
          />
        </div>
      </div>
      {/* product price */}
      <div className="font-semibold">
        {data.oneQuantityPrice.toLocaleString("vi-VN") + " VND"}
      </div>
    </div>
  );
};

export default CartItem;
