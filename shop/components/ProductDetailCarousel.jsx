import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
const ProductDetailCarousel = ({ productData }) => {
  return (
    <div className="text-white text-[12px] w-full max-w-[1360px] py-2 mx-auto sticky top-[50px]">
      <Carousel
        showStatus={false}
        infiniteLoop={true}
        showIndicators={false}
        thumbWidth={60}
        useKeyboardArrows={true}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="absolute right-[30px] md:right-[50px] bottom-2 w-[30px] h-[30px] bg-white text-black rounded-full z-10 flex items-center justify-center cursor-pointer hover:opacity-90 "
          >
            <AiOutlineArrowLeft className="text-sm " />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute right-[5px]  bottom-2 w-[30px] h-[30px] bg-white text-black rounded-full z-10 flex items-center justify-center cursor-pointer hover:opacity-90 "
          >
            <AiOutlineArrowRight className="text-sm " />
          </div>
        )}
        className="productCarousel"
      >
        <img src={productData?.data?.records?.product?.main_image} alt="" />

        {productData?.data?.records?.product?.sub_images.map((img) => (
          <img src={img} key={img} />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailCarousel;
