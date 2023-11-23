import { TSale, TSaleData } from "@/types/saleTagTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const festivalsApi = createApi({
  reducerPath: "festivalsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  tagTypes: ["Festivals"],
  endpoints: (builder) => ({
    getFestivals: builder.query<TSaleData, void>({
      query: () => `/api/v1/festival`,
      providesTags: ["Festivals"],
    }),
    getFestivalById: builder.query<TSaleData, string>({
      query: (id: string) => `/api/v1/festival/${id}`,
      providesTags: ["Festivals"],
    }),
    createFestival: builder.mutation<TSale, Partial<TSale>>({
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
      TSale,
      { id: string; payload: Partial<TSale> }
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
