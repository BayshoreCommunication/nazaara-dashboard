import { TSubCategory, TSubCategoryFrom } from "@/types/categoryTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subCategoriesApi = createApi({
  reducerPath: "subCategoriesApi",
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
  tagTypes: ["SubCategory"],
  endpoints: (builder) => ({
    getSubCategories: builder.query<TSubCategory, void>({
      query: () => `/api/v1/sub-category`,
      providesTags: ["SubCategory"],
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
      invalidatesTags: ["SubCategory"],
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/api/v1/sub-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubCategory"],
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
      invalidatesTags: ["SubCategory"],
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation,
} = subCategoriesApi;
