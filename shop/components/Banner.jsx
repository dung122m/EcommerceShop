import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const Banner = () => {
  return (
    <div className="relative text-black text-[20px] w-full max-w-[1360px] mx-auto mt-3 ">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={2000}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
      >
        <div className="aspect-[16/10] md:aspect-auto object-cover">
          <img src="/slide2.jpg" />
        </div>
        <div>
          <img src="/slide1.jpg" />
        </div>
        <div>
          <img src="/slide3.jpg" />
        </div>
      </Carousel>
      <style></style>
    </div>
  );
};

export default Banner;
