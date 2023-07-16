import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ICategory {
  status: string;
  data: IData[];
}

export interface IData {
  _id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory, void>({
      query: () => `/api/v1/category/`,
    }),
    getCategoryById: builder.query<IData, string>({
      query: (id: string) => `/api/v1/category/${id}`,
    }),
    createCategory: builder.mutation<IData, Partial<IData>>({
      query: (payload) => ({
        url: "/api/v1/category/",
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
      IData,
      { id: string; payload: Partial<IData> }
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
        await dispatch(
          categoriesApi.endpoints.getCategoryById.initiate(data._id)
        ); // Fetch the updated category
        await dispatch(categoriesApi.endpoints.getCategories.initiate()); // Fetch the updated category list
      },
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/v1/category/${id}`,
        method: "DELETE",
      }),
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
