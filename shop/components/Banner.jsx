import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const Banner = () => {
  return (
    <div className="relative text-black text-[20px] w-full mt-3 ">
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        interval={2000}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
      >
        <div className="aspect-[16/10] md:aspect-auto object-cover">
          <img src="/slide2.jpg" />
        </div>
        <div className="aspect-[16/10] md:aspect-auto object-cover">
          <img src="/slide1.jpg" />
        </div>
        <div className="aspect-[16/10] md:aspect-auto object-cover">
          <img src="/slide3.jpg" />
        </div>
        <div className="aspect-[16/10] md:aspect-auto object-cover">
          <img src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_2426,c_limit/1f905932-1d85-4a54-a42b-0ebfe9ca3463/nike-just-do-it.png" />
        </div>
        <div className="aspect-[16/10] md:aspect-auto object-cover">
          <img
            src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1776,c_limit/b6de205f-c91a-4cb2-b58a-b2bb29080cd0/nike-just-do-it.jpg"
            alt=""
          />
        </div>
      </Carousel>
      <style></style>
    </div>
  );
};

export default Banner;
