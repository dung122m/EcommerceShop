import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import RelatedProducts from "@/components/RelatedProducts";
import Wrapper from "@/components/Wrapper";

import { Inter } from "@next/font/google";
import axios from "./api/axios";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/categories");
        setData(data);
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <main>
        <Banner />
        <Wrapper>
          <div className="text-center max-w-[800px] mx-auto  my-[20px] md:my-[50px]">
            <div className="text-[40px]  mb-5 font-semibold leading-tight">
              A SPRINGY RIDE FOR EVERY RUN{" "}
            </div>
            <div className="text-lg md:text-base">
              Back in its fourth decade,the Pegasus 40 is springier than ever
              with more cushioned,personalized fit.
            </div>
          </div>
          <RelatedProducts className="mb-2" />
        </Wrapper>
      </main>
    </>
  );
}
