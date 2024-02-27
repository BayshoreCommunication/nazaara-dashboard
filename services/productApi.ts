import {
  TProduct,
  TProductCategory,
  TProductErpIdData,
  TProductGetOne,
  TProductSlugData,
  TProducts,
} from "@/types/types";
import { StockInfo } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}`,
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        `Nazaara@Token ${process.env.API_SECURE_KEY}`
      );
      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<TProducts, { page?: number; limit?: number }>({
      query: ({ page, limit }) => {
        return {
          url: "/api/v1/product",
          params: { page, limit },
        };
      },
      providesTags: (result, error, { page = 1, limit = 10 }) =>
        result ? [{ type: "Product", id: "List", page, limit }] : [],
    }),
    getProductsCategories: builder.query<TProductCategory, void>({
      query: () => "/api/v1/product/categories",
      providesTags: ["Product"],
    }),
    getProductErpId: builder.query<TProductErpIdData, void>({
      query: () => `/api/v1/product/erpid`,
      providesTags: ["Product"],
    }),
    getProductById: builder.query<TProductGetOne, string>({
      query: (id: string) => `/api/v1/product/${id}`,
      providesTags: ["Product"],
    }),
    getProductBySlug: builder.query<TProductSlugData, void>({
      query: () => `/api/v1/product/slugs`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation<TProductGetOne, Partial<TProduct>>({
      query: (payload) => ({
        url: "/api/v1/product",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Product"],
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
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/v1/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    getStockDtls: builder.query<StockInfo, void>({
      query: () => `/api/v1/product/productStockDtls`,
      providesTags: ["Product"],
    }),
    getStockProductDtls: builder.query<StockInfo, void>({
      query: () => `/api/v1/product/productStockOut`,
      providesTags: ["Product"],
    }),
    getSubCategoryProductCount: builder.query<any, void>({
      query: () => `/api/v1/product/subcategory-product-count`,
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSubCategoryProductCountQuery,
  useGetProductsCategoriesQuery,
  useGetProductErpIdQuery,
  useGetProductByIdQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetStockDtlsQuery,
  useGetStockProductDtlsQuery,
} = productsApi;
