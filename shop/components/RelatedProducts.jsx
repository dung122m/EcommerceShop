import React, { useEffect, useState } from "react";
import axios from "@/pages/api/axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import Cookies from "js-cookie";
import { log } from "react-modal/lib/helpers/ariaAppHider";
const RelatedProducts = ({ slug }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedProductsCf, setRelatedProductsCf] = useState([]);
  const [apioriProducts, setapioriProducts] = useState([]);
  const accessToken = localStorage.getItem("access_token");
  useEffect(() => {
    axios
      .get(`/products/${slug}/apriori`)
      .then((response) => {
        setapioriProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);

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
  accessToken
    ? useEffect(() => {
        const axios = require("axios");

        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "http://localhost:8080/api/v2/products/cf",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        axios
          .request(config)
          .then((response) => {
            setRelatedProductsCf(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [])
    : useEffect(() => {
        const axios = require("axios");
        let data = JSON.stringify({
          session_id: "658634d8d3d8bc064f3834e3",
        });

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "http://localhost:8080/api/v2/products/cf/guest",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            setRelatedProductsCf(response.data.data);
            console.log(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

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
      {(relatedProducts.length > 0 || relatedProductsCf.length > 0) && (
        <div>
          {relatedProducts.length > 0 && (
            <div>
              <div className="text-2xl font-bold mb-5">Similar Products</div>
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
          )}
          <div className="mt-10">
            {relatedProductsCf.length > 0 && (
              <div>
                <div className="text-2xl font-bold mb-5">
                  You Might Also Like
                </div>
                <Carousel
                  responsive={responsive}
                  containerClass="-mx-[10px]"
                  itemClass="px-[10px]"
                >
                  {relatedProductsCf.map((product) => (
                    <ProductCard key={product.id} data={product} />
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        </div>
      )}
      {apioriProducts.length > 0 && (
        <div className="mt-10">
          <div>
            <div className="text-2xl font-bold mb-5">
              Frequently Bought With
            </div>
            <Carousel
              responsive={responsive}
              containerClass="-mx-[10px]"
              itemClass="px-[10px]"
            >
              {apioriProducts.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
