
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IProducts {
    status: string
    total: number
    data: IProducts[]
  }
  
  export interface IProduct {
    _id: string
    sku: string
    productName: string
    regularPrice: number
    salePrice: number
    variant: IVariant[]
    size: string[]
    slug: string
    description: string
    category: ICategory
    subCategory: ISubCategory
    promotion: string
    imageUrl: string[]
    status: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface IVariant {
    color: string
    quantity: number
    _id: string
  }
  
  export interface ICategory {
    _id: string
    name: string
    status: string
  }
  
  export interface ISubCategory {
    _id: string
    name: string
    status: string
  }
  

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "process.env.API_URL" }),
    endpoints: (builder) => ({
      getProducts: builder.query<IProducts, void>({
        query: () => `/api/v1/product/`,
      }),
      getProductById: builder.query<IProduct, string>({
        query: (id: string) => `/api/v1/product/${id}`,
      }),
    }),
  });
  
  export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;