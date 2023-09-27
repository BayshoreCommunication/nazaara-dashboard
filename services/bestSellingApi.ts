import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface BestSellingItem {
  _id?: string;
  slug: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface BestSellingDataResponse {
  success?: boolean;
  message?: string;
  bestSellingData: BestSellingItem[];
}

export const bestSellingApi = createApi({
  reducerPath: "bestSellingApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  tagTypes: ["BestSelling"],
  endpoints: (builder) => ({
    getBestSelling: builder.query<BestSellingDataResponse, void>({
      query: () => `/api/v1/best-selling-product`,
      providesTags: ["BestSelling"],
    }),
    updateBestSelling: builder.mutation<
      BestSellingItem,
      { id: string; payload: Partial<BestSellingItem> }
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
