import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import Wrapper from "@/components/Wrapper";
import ProductDetailCarousel from "@/components/ProductDetailCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import Head from "next/head";
const ProductDetails = () => {
  return (
    <div className="w-full md:py-5 ">
      <Head>
        <title>Jordan Retro 6 Men's Shoes</title>
      </Head>
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] py-5 lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailCarousel />
          </div>
          {/* left column end */}
          {/* right column start */}

          <div className="flex-[1] py-3">
            {/* product title */}
            <div className="text-[34px] font-semibold mb-2">Jordan Retro 6</div>
            {/* product subtitle */}
            <div className="text-lg font-medium mb-5">Men&apos;s Shoes</div>
            {/* product price */}
            <div className="text-lg font-semibold">3,239,000đ</div>
            {/* product size start */}
            <div className="my-5">
              <div className="flex justify-between mb-5">
                <div className="text-md font-medium "> Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Size Guide
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  EU 36.5
                </div>{" "}
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  EU 36.5
                </div>{" "}
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  EU 36.5
                </div>{" "}
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  EU 36.5
                </div>{" "}
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  EU 36.5
                </div>{" "}
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  EU 36.5
                </div>{" "}
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  EU 36.5
                </div>{" "}
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  EU 36.5
                </div>{" "}
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  EU 36.5
                </div>{" "}
                <div className="border rounded-md text-center py-3 font-medium bg-black/[0.1] hover:border-black cursor-not-allowed opacity-50">
                  EU 36.5
                </div>
                <div className="border rounded-md text-center py-3 font-medium bg-black/[0.1] hover:border-black cursor-not-allowed opacity-50">
                  EU 36.5
                </div>
                <div className="border rounded-md text-center py-3 font-medium bg-black/[0.1] hover:border-black cursor-not-allowed opacity-50">
                  EU 36.5
                </div>
              </div>
            </div>
            {/* product size end */}
            <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">
              Add to Bag
            </button>{" "}
            <button className="w-full py-4 rounded-full border border-black/[0.9] text-lg font-medium transition-transform active:scale-95  hover:opacity-75 flex items-center justify-center gap-2  mb-10">
              Favorite
              <IoMdHeartEmpty size={20} />
            </button>
            <div>
              <div className="text-lg font-bold mb-5">Product Detail</div>
              <div className="text-md mb-5">
                Elevate your style. This AF-1 takes its cues from nature with
                woven canvas and a speckled sole. Peep the cork material on the
                insole and heel tab for an extra earthy touch.
              </div>
            </div>
          </div>
          {/* right column end */}
        </div>

        <RelatedProducts />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
