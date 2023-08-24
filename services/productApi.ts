import {
  TProduct,
  TProductErpIdData,
  TProductGetOne,
  TProducts,
} from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  endpoints: (builder) => ({
    getProducts: builder.query<TProducts, { page: number; limit: number }>({
      query: ({ page, limit }) => {
        // use page and limit values here
        return { url: "/api/v1/product", params: { page, limit } };
      },
    }),
    getProductErpId: builder.query<TProductErpIdData, void>({
      query: () => `/api/v1/product/erpid`,
    }),
    getProductById: builder.query<TProductGetOne, string>({
      query: (id: string) => `/api/v1/product/${id}`,
    }),
    createProduct: builder.mutation<TProduct, Partial<TProduct>>({
      query: (payload) => ({
        url: "/api/v1/product",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      // Update the cache after successful creation
      async onQueryStarted(data: any, { dispatch, queryFulfilled }) {
        await queryFulfilled; // Wait for the query to be fulfilled
        await dispatch(productsApi.endpoints.getProductById.initiate(data._id)); // Fetch the updated category
        await dispatch(productsApi.endpoints.getProducts.initiate()); // Fetch the updated category list
      },
    }),
    updateProduct: builder.mutation<
      TProduct,
      { id: string; payload: Partial<TProduct> }
    >({
      query: ({ id, payload }) => ({
        url: `/api/v1/product/${id}`,
        method: "PATCH",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      // Update the cache after successful creation
      async onQueryStarted(data: any, { dispatch, queryFulfilled }) {
        await queryFulfilled; // Wait for the query to be fulfilled
        await dispatch(productsApi.endpoints.getProductById.initiate(data._id)); // Fetch the updated category
        await dispatch(productsApi.endpoints.getProducts.initiate()); // Fetch the updated category list
      },
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/v1/product/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductErpIdQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
