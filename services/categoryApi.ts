import { TCategoryData, TCategory } from "@/types/categoryTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<TCategory, void>({
      query: () => `/api/v1/category`,
      providesTags: ["Category"],
    }),
    getCategoryById: builder.query<TCategoryData, string>({
      query: (id: string) => `/api/v1/category/${id}`,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<TCategoryData, Partial<TCategoryData>>({
      query: (payload) => ({
        url: "/api/v1/category",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<
      TCategoryData,
      { id: string; payload: Partial<TCategoryData> }
    >({
      query: ({ id, payload }) => ({
        url: `/api/v1/category/${id}`,
        method: "PATCH",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/v1/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
