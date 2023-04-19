import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
const CartItem = () => {
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* image start */}

      <div className="shrink-0 aspect-square w-[50px] md:w-[120px] ">
        <img src="product-1.webp" alt="" />
      </div>
      {/* image end */}
      <div className="w-full flex flex-col">
        <div className="flex flex-col justify-between">
          {/* product title */}
          <div className="text-lg  font-semibold text-black/[0.8]">
            Jordan 6 Retro
          </div>
          {/* product subtittle */}
          <div className="text-sm font-medium text-black/[0.5] mb-1">
            Men&apos;s Shoes
          </div>

          {/* product color */}
          <div className="text-sm font-medium text-black/[0.5] ">
            Black/White
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3  text-black/[0.5]">
              <div className="flex items-center gap-1">
                <div className="font-semibold">Size</div>
                <select className="hover:text-black">
                  <option value="1">36</option>
                  <option value="2">37</option>
                  <option value="3">38</option>
                  <option value="4">39</option>
                  <option value="5">40</option>
                  <option value="6">41</option>
                </select>
              </div>
              <div className="font-semibold">Quantity</div>
              <select className="hover:text-black">
                <option value="1">1</option>
              </select>
            </div>
          </div>
          <RiDeleteBin6Line className="cursor-pointer mt-3 text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" />
        </div>
      </div>
      {/* product price */}
      <div className="font-semibold">3.290.000đ</div>
    </div>
  );
};

export default CartItem;
