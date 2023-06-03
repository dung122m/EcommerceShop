import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import Head from "next/head";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
export default function All({ products }) {
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedSortOption, setSelectedSortOption] = useState("Default");
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
  const handlePriceRangeChange = (event) => {
    const selectedPriceRange = event.target.value;
    setSelectedPriceRange(selectedPriceRange);

    let filteredByCategory = [];
    if (selectedCategory === "All") {
      filteredByCategory = products.data.records;
    } else {
      filteredByCategory = products.data.records.filter((product) =>
        product.Categories.some(
          (category) => category.name === selectedCategory
        )
      );
    }

    let filteredByCategoryAndPriceRange = filteredByCategory;
    if (selectedPriceRange !== "All") {
      if (selectedPriceRange === "option1") {
        filteredByCategoryAndPriceRange = filteredByCategory.filter(
          (product) =>
            product.current_price >= 0 && product.current_price <= 1000000
        );
      } else if (selectedPriceRange === "option2") {
        filteredByCategoryAndPriceRange = filteredByCategory.filter(
          (product) =>
            product.current_price >= 1000000 && product.current_price <= 2000000
        );
      } else if (selectedPriceRange === "option3") {
        filteredByCategoryAndPriceRange = filteredByCategory.filter(
          (product) =>
            product.current_price >= 2000000 && product.current_price <= 3000000
        );
      } else if (selectedPriceRange === "option4") {
        filteredByCategoryAndPriceRange = filteredByCategory.filter(
          (product) =>
            product.current_price > 3000000 && product.current_price < 4000000
        );
      } else if (selectedPriceRange === "> 4.000.000") {
        filteredByCategoryAndPriceRange = filteredByCategory.filter(
          (product) => product.current_price > 4000000
        );
      }
    }

    setFilteredProducts(filteredByCategoryAndPriceRange);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };
  const handleSortOptionChange = (event) => {
    const selectedSortOption = event.target.value;
    setSelectedSortOption(selectedSortOption);

    let sortedProducts = [...filteredProducts];
    if (selectedSortOption === "PriceLowToHigh") {
      sortedProducts.sort((a, b) => a.current_price - b.current_price);
    } else if (selectedSortOption === "PriceHighToLow") {
      sortedProducts.sort((a, b) => b.current_price - a.current_price);
    } else if (selectedSortOption === "A-Z") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSortOption === "Z-A") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(sortedProducts);
  };
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);

    const filteredByCategory =
      selectedCategory === "All"
        ? products.data.records
        : products.data.records.filter((product) =>
            product.Categories.some(
              (category) => category.name === selectedCategory
            )
          );

    let filteredByCategoryAndPriceRange = filteredByCategory;
    if (selectedPriceRange !== "All") {
      if (selectedPriceRange === "option1") {
        filteredByCategoryAndPriceRange =
          filteredByCategoryAndPriceRange.filter(
            (product) =>
              product.current_price >= 0 && product.current_price <= 1000000
          );
      } else if (selectedPriceRange === "option2") {
        filteredByCategoryAndPriceRange =
          filteredByCategoryAndPriceRange.filter(
            (product) =>
              product.current_price >= 1000000 &&
              product.current_price <= 2000000
          );
      } else if (selectedPriceRange === "option3") {
        filteredByCategoryAndPriceRange =
          filteredByCategoryAndPriceRange.filter(
            (product) =>
              product.current_price >= 2000000 &&
              product.current_price <= 3000000
          );
      } else if (selectedPriceRange === "option4") {
        filteredByCategoryAndPriceRange = filteredByCategory.filter(
          (product) =>
            product.current_price > 3000000 && product.current_price < 4000000
        );
      } else if (selectedPriceRange === "> 4.000.000") {
        filteredByCategoryAndPriceRange = filteredByCategory.filter(
          (product) => product.current_price > 4000000
        );
      }
    }

    setFilteredProducts(filteredByCategoryAndPriceRange);
  };

  return (
    <div className="flex min-h-screen">
      <Head>
        <title>All Products</title>
      </Head>
      <Wrapper>
        <div className="pl-5 my-5 flex md:flex-row flex-col md:justify-between md:items-center w-full ">
          <div>
            <FormControl>
              <InputLabel id="my-select-label" className="mb-5">
                Categories
              </InputLabel>
              <Select
                labelId="my-select-label"
                id="my-select"
                className="w-48 h-10"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                {categories?.map((category, index) => (
                  <MenuItem key={category.name} value={category.name}>
                    {truncateText(category.name, 20)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className=" mt-1">
            <FormControl>
              <InputLabel id="my-select-label" className="mb-5">
                Price Range
              </InputLabel>
              <Select
                labelId="my-select-label"
                id="my-select"
                className="w-48 h-10"
                value={selectedPriceRange}
                onChange={handlePriceRangeChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="option1">0 - 1.000.000</MenuItem>
                <MenuItem value="option2">1.000.000 - 2.000.000</MenuItem>

                <MenuItem value="option3">2.000.000 - 3.000.000</MenuItem>
                <MenuItem value="option4">3.000.000 - 4.000.000</MenuItem>
                <MenuItem value="> 4.000.000">{"> 4.000.000"}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="mt-1 ">
            <FormControl>
              <InputLabel id="my-select-label" className="mb-5">
                Sort by
              </InputLabel>
              <Select
                labelId="my-select-label"
                id="my-select"
                className="w-48 h-10"
                value={selectedSortOption}
                onChange={handleSortOptionChange}
              >
                <MenuItem value="Default">Default</MenuItem>
                <MenuItem value="PriceLowToHigh">Price: Low to High</MenuItem>
                <MenuItem value="PriceHighToLow">Price: High to Low</MenuItem>
                <MenuItem value="A-Z">A - Z</MenuItem>
                <MenuItem value="Z-A">Z - A</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </Wrapper>
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
