import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import RelatedProducts from "@/components/RelatedProducts";
import Wrapper from "@/components/Wrapper";

import { Inter } from "@next/font/google";
import axios from "./api/axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ products }) {
  return (
    <>
      <main>
        <Banner />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {" "}
          {products.data.records.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
        {console.log(products.data.records)}

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
export async function getStaticProps() {
  const response = await axios.get("/products");
  return {
    props: {
      products: response.data,
    },
  };
}
