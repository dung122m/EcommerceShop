import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import RelatedProducts from "@/components/RelatedProducts";
import Wrapper from "@/components/Wrapper";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className="">
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
