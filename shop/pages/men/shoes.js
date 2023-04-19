import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import Head from "next/head";
import React from "react";

const shoes = () => {
  return (
    <div>
      <Head>
        <title>Men's Shoes </title>
      </Head>
      <Wrapper>
        <div className=" text-[32px]  font-semibold my-5">Shoes</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Wrapper>
    </div>
  );
};

export default shoes;
