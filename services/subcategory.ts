import {
  TSubCategory,
  TSubCategoryData,
  TSubCategoryFrom,
} from "@/types/categoryTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subCategoriesApi = createApi({
  reducerPath: "subCategoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  endpoints: (builder) => ({
    getSubCategories: builder.query<TSubCategory, void>({
      query: () => `/api/v1/sub-category`,
    }),
    createSubCategory: builder.mutation<
      TSubCategory,
      Partial<TSubCategoryFrom>
    >({
      query: (payload) => ({
        url: "/api/v1/sub-category",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      // Update the cache after successful creation
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled; // Wait for the query to be fulfilled
        await dispatch(subCategoriesApi.endpoints.getSubCategories.initiate()); // Fetch the updated category list
      },
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/api/v1/sub-category/${id}`,
        method: "DELETE",
      }),
    }),
    updateSubCategory: builder.mutation<
      TSubCategory,
      { id: string; payload: Partial<TSubCategoryFrom> }
    >({
      query: ({ id, payload }) => ({
        url: `/api/v1/sub-category/${id}`,
        method: "PATCH",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation,
} = subCategoriesApi;
