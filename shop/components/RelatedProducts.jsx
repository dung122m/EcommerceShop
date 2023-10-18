import React, { useEffect, useState } from "react";
import axios from "@/pages/api/axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
const RelatedProducts = ({ slug }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    axios
      .post("/products/cbf", { product_id: slug })
      .then((response) => {
        setRelatedProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="mt-[50px] md:mt-[100px] mb-[100px] md:mb-2">
      {relatedProducts.length !== 0 ? (
        <div>
          <div className="text-2xl font-bold mb-5">You Might Also Like </div>
          <Carousel
            responsive={responsive}
            containerClass="-mx-[10px]"
            itemClass="px-[10px]"
          >
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </Carousel>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default RelatedProducts;
