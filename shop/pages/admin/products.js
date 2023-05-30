import LayoutAdmin from "@/components/LayoutAdmin";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Products = () => {
  return (
    <LayoutAdmin>
      <Head>
        <title>Product</title>
      </Head>
      <Link
        className="bg-blue-700 text-white py-1 px-2 rounded-md"
        href="/admin/products/news"
      >
        Add new product
      </Link>
    </LayoutAdmin>
  );
};

export default Products;
