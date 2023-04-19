import React from "react";
import Head from "next/head";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import Link from "next/link";
import Banner from "@/components/Banner";

const men = () => {
  const cate = [
    { id: 1, name: "Shoes", url: "/men/shoes" },
    { id: 2, name: "Clothing", url: "/men/clothing" },
  ];
  return (
    <div>
      <Head>
        <title>Men's Shoes & Clothing</title>
      </Head>
      <div>
        <div className="flex md:gap-20 gap-5 w-full flex-col md:flex-row my-5 md:mx-5 justify items-center">
          <div className=" text-[32px]  font-semibold md:basis-1/3">Men</div>
          <div>
            <ul className="flex justify-end gap-20 items-center md:basis-2/3">
              {cate.map((item) => (
                <React.Fragment key={item.id}>
                  <li>
                    <Link href={item?.url}>{item.name}</Link>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-2">
          <Banner />
        </div>
      </div>
    </div>
  );
};

export default men;
