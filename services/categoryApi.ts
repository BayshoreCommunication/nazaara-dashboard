import { TCategoryData, TCategory } from "@/types/categoryTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  endpoints: (builder) => ({
    getCategories: builder.query<TCategory, void>({
      query: () => `/api/v1/category`,
    }),
    getCategoryById: builder.query<TCategoryData, string>({
      query: (id: string) => `/api/v1/category/${id}`,
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
      // Update the cache after successful creation
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled; // Wait for the query to be fulfilled
        await dispatch(categoriesApi.endpoints.getCategories.initiate()); // Fetch the updated category list
      },
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
      // Update the cache after successful creation
      async onQueryStarted(data: any, { dispatch, queryFulfilled }) {
        await queryFulfilled; // Wait for the query to be fulfilled
        // Fetch the updated category
        // await dispatch(categoriesApi.endpoints.getCategoryById.initiate(data._id));
        await dispatch(categoriesApi.endpoints.getCategories.initiate()); // Fetch the updated category list
      },
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/v1/category/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(data: any, { dispatch, queryFulfilled }) {
        await queryFulfilled; // Wait for the query to be fulfilled
        // Fetch the updated category
        // await dispatch(categoriesApi.endpoints.getCategoryById.initiate(data._id));
        await dispatch(categoriesApi.endpoints.getCategories.initiate()); // Fetch the updated category list
      },
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
