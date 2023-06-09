import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getDiscountedPricePercentage } from "@/utils/helper";
const ProductCard = ({ data }) => {
  return (
    <Link
      href={`/products/${data?.id}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <img
        src={data?.main_image}
        alt=""
        height={500}
        width={500}
        className="shrink-0 aspect-square"
      />
      <div className="p-4 text-black/[0.9]">{data?.name}</div>
      <div className="flex items-center text-black/[0.5]">
        <p className="ml-2 mr-4 text-lg font-semibold ">
          {" "}
          {data?.current_price.toLocaleString("vi-VN") + " VND"}
        </p>
        <p className="text-sm font-medium line-through">
          {data?.original_price.toLocaleString("vi-VN") + " VND"}
        </p>
        <p className="ml-auto text-base font-medium text-green-500">
          {getDiscountedPricePercentage(
            data?.original_price,
            data?.current_price
          )}{" "}
          %
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
