import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import React, { useEffect } from "react";
import axios from "../api/axios";

const Category = () => {
  const getCategory = async () => {
    const { data } = await axios.get("/categories");
    const paths = data?.data?.records.map((category) =>
      console.log(category.name.replace(/\s+/g, ""))
    );
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0 ">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Running Shoes
          </div>
        </div>
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

export default Category;
export async function getStaticPaths() {
  let paths = [];

  try {
    const { data } = await axios.get("/categories");

    if (data && data.records) {
      paths = data.records.map((category) => ({
        params: {
          slug: category.name.replace(/\s+/g, "-"),
        },
      }));
    }
  } catch (error) {
    console.error(error);
  }

  return { paths, fallback: false };
}
export async function getStaticProps() {}
