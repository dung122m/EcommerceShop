import React, { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import Wrapper from "@/components/Wrapper";
import ProductDetailCarousel from "@/components/ProductDetailCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import axios from "../api/axios";
import { getDiscountedPricePercentage } from "@/utils/helper";
import { addToCart } from "@/store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ productData }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const p = productData?.data?.records?.product;
  const s = productData?.data?.records?.variants;
  const mutableArr = [...s];
  return (
    <div className="w-full md:py-5 ">
      <Head>
        <title>{p?.name}</title>
      </Head>
      <Wrapper>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] py-5 lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailCarousel productData={productData} />
          </div>
          {/* left column end */}
          {/* right column start */}

          <div className="flex-[1] py-3">
            {/* product title */}
            <div className="text-[28px] font-semibold mb-2">{p?.name}</div>
            {/* product subtitle */}
            <div className="text-lg font-medium mb-5">
              {p?.Categories[1]?.name
                ? p?.Categories[1]?.name
                : p?.Categories[0]?.name}
            </div>
            {/* product price */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                {p?.current_price.toLocaleString("vi-VN") + " VND"}
              </p>
              {p?.original_price && (
                <>
                  <p className="text-base text-black/[0.5]  font-medium line-through">
                    {p?.original_price.toLocaleString("vi-VN") + " VND"}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPricePercentage(
                      p?.original_price,
                      p?.current_price
                    )}
                    % off
                  </p>
                </>
              )}
            </div>
            {/* product size start */}
            <div className="my-5">
              <div className="flex justify-between mb-5">
                <div className="text-md font-medium "> Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Size Guide
                </div>
              </div>
              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                {mutableArr?.reverse().map((size) => (
                  <div
                    className={`border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer ${
                      selectedSize === size?.size ? "border-black " : ""
                    }`}
                    z
                    key={size?.size}
                    onClick={() => {
                      setSelectedSize(size?.size);
                      setShowError(false);
                    }}
                  >
                    {size?.size}
                  </div>
                ))}
              </div>
            </div>
            {/* product size end */}
            {/* show error st */}
            {showError && (
              <div className="text-red-600 my-5">
                {" "}
                Size selection is required
              </div>
            )}
            {/* show error end */}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() => {
                if (!selectedSize) {
                  setShowError(true);
                  document.getElementById("sizesGrid").scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                  });
                } else {
                  dispatch(
                    addToCart({
                      ...productData?.data?.records,
                      selectedSize,
                      oneQuantityPrice: p?.current_price,
                    })
                  );
                  toast.success("Success. Check your cart !");
                }
              }}
            >
              Add to Bag
            </button>{" "}
            <button className="w-full py-4 rounded-full border border-black/[0.9] text-lg font-medium transition-transform active:scale-95  hover:opacity-75 flex items-center justify-center gap-2  mb-10">
              Favorite
              <IoMdHeartEmpty size={20} />
            </button>
            <div>
              <div className="text-lg font-bold mb-5">Product Detail</div>
              <div className="text-md mb-5">{p?.description}</div>
            </div>
          </div>
          {/* right column end */}
        </div>

        {/* <RelatedProducts /> */}
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  async function fetchData() {
    try {
      const response = await axios.get("/products");
      return response.data.data.records;
    } catch (error) {
      console.error(error);
    }
  }

  const data = await fetchData();
  const paths = data.map((p) => ({
    params: {
      slug: p.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  try {
    const response = await axios.get(`/products/${slug}`);
    const productData = response.data;

    return {
      props: {
        productData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        productData: null,
      },
    };
  }
}
