import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import React, { useEffect } from "react";
import axios from "../api/axios";
import Menu from "@/components/Menu";
import Head from "next/head";

const Men = ({ men }) => {
  return (
    <div className="w-full md:py-20">
      <Head>
        <title>Kid's Shoe, Clothing & Accessories</title>
      </Head>
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0 ">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Kid
          </div>
        </div>
        <div className=" mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-14 px-5 ">
          {men?.data[0]?.Products.map((men) => (
            <ProductCard key={men.id} data={men} />
          ))}
        </div>
      </Wrapper>
    </div>
  );
};
export default Men;
export async function getStaticProps() {
  const response = await axios.get("/categories/6471d20022caa364d016c6ad");

  return {
    props: {
      men: response.data,
    },
  };
}
