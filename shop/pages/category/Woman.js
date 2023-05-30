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
        <title>Woman's Shoe, Clothing & Accessories</title>
      </Head>
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0 ">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Woman
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-14 px-5 md:px-0">
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
  const response = await axios.get("/categories/646f85bfd037cd28143738d9");

  return {
    props: {
      men: response.data,
    },
  };
}
