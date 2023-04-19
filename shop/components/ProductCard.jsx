import React from "react";
import Link from "next/link";
const ProductCard = () => {
  return (
    <Link href="/product/1">
      <img
        src="/product-1.webp"
        alt=""
        className="w-full transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
      />
      <div className="p-4 text-black/[0.9]">Product Name</div>
      <div className="flex items-center text-black/[0.5]">
        <p className="ml-2 mr-4 text-lg font-semibold "> $20</p>
        <p className="text-base font-medium line-through">$25</p>
        <p className="ml-auto text-base font-medium text-green-500"> 20% off</p>
      </div>
    </Link>
  );
};

export default ProductCard;
