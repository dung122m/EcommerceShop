import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productAPI = createApi({
  reducerPath: "product_api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v2/",
    prepaerHeaders: async (headers) => {
      const token = localStorage.getItem("accessAdmin");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page }) => ({
        url: `products?page=${page}&limit=10&sort=asc&orderBy=id`,
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productAPI;
