import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bestSellingApi = createApi({
  reducerPath: "bestSellingApi",
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
  tagTypes: ["BestSelling"],
  endpoints: (builder) => ({
    getBestSelling: builder.query<any, void>({
      query: () => `/api/v1/best-selling-product`,
      providesTags: ["BestSelling"],
    }),
    updateBestSelling: builder.mutation<
      any,
      { id: string; payload: Partial<any> }
    >({
      query: ({ id, payload }) => ({
        url: `/api/v1/best-selling-product/${id}`,
        method: "PATCH",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["BestSelling"],
    }),
  }),
});

export const { useGetBestSellingQuery, useUpdateBestSellingMutation } =
  bestSellingApi;
