import {
  TFastival,
  TFastivalCreate,
  TFastivalData,
  TFastivalDataOne,
} from "@/types/festivalTagTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const festivalsApi = createApi({
  reducerPath: "festivalsApi",
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
  tagTypes: ["Festivals"],
  endpoints: (builder) => ({
    getFestivals: builder.query<TFastivalData, void>({
      query: () => `/api/v1/festival`,
      providesTags: ["Festivals"],
    }),
    getFestivalById: builder.query<TFastivalDataOne, string>({
      query: (id: string) => `/api/v1/festival/${id}`,
      providesTags: ["Festivals"],
    }),
    createFestival: builder.mutation<TFastivalData, Partial<TFastivalCreate>>({
      query: (payload) => ({
        url: "/api/v1/festival",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Festivals"],
    }),
    updateFestival: builder.mutation<
      TFastivalData,
      { id: string; payload: Partial<TFastival> }
    >({
      query: ({ id, payload }) => ({
        url: `/api/v1/festival/${id}`,
        method: "PATCH",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Festivals"],
    }),
    deleteFestival: builder.mutation({
      query: (id) => ({
        url: `/api/v1/festival/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Festivals"],
    }),
  }),
});

export const {
  useGetFestivalsQuery,
  useGetFestivalByIdQuery,
  useCreateFestivalMutation,
  useUpdateFestivalMutation,
  useDeleteFestivalMutation,
} = festivalsApi;
