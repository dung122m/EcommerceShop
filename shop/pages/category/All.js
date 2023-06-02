import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import Head from "next/head";

export default function All({ products }) {
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/categories");
        const sortedCategories = [
          { name: "All" },
          ...response.data.data.records,
        ];
        setCategories(sortedCategories);
        const initialFilteredProducts = products.data.records;
        setFilteredProducts(initialFilteredProducts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);

    // Filter products based on selected category
    const filteredByCategory =
      selectedCategory === "All"
        ? products.data.records
        : products.data.records.filter((product) =>
            product.Categories.some(
              (category) => category.name === selectedCategory
            )
          );

    setFilteredProducts(filteredByCategory);
  };

  return (
    <div className="flex min-h-screen">
      <Head>
        <title>All Products</title>
      </Head>
      <div>
        <div className="pl-5">
          <h2>Category:</h2>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-50"
          >
            {categories?.map((category, index) => (
              <option key={category.name} value={category.name}>
                {truncateText(category.name, 20)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Wrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </Wrapper>
      <div>Sort</div>
    </div>
  );
}

export async function getStaticProps() {
  const response = await axios.get("/products");
  return {
    props: {
      products: response.data,
    },
  };
}
