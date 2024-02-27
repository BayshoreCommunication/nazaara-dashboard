import { TSubCategory, TSubCategoryFrom } from "@/types/categoryTypes";
import {
  TNavAdvertisement,
  TNavAdvertisements,
} from "@/types/navAdvertisementTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const navAdvertisementApi = createApi({
  reducerPath: "navAdvertisementApi",
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
  tagTypes: ["NavAdvertisement"],
  endpoints: (builder) => ({
    getNavAdvertisements: builder.query<TNavAdvertisements, void>({
      query: () => `/api/v1/nav-advertise`,
      providesTags: ["NavAdvertisement"],
    }),
    createNavAdvertisement: builder.mutation<
      TNavAdvertisement,
      Partial<TNavAdvertisement>
    >({
      query: (payload) => ({
        url: "/api/v1/nav-advertise",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["NavAdvertisement"],
    }),
    deleteNavAdvertisement: builder.mutation({
      query: (id) => ({
        url: `/api/v1/nav-advertise/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NavAdvertisement"],
    }),
    updateNavAdvertisement: builder.mutation<
      TNavAdvertisement,
      { id: string; payload: Partial<TNavAdvertisement> }
    >({
      query: ({ id, payload }) => ({
        url: `/api/v1/nav-advertise/${id}`,
        method: "PATCH",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["NavAdvertisement"],
    }),
  }),
});

export const {
  useGetNavAdvertisementsQuery,
  useCreateNavAdvertisementMutation,
  useDeleteNavAdvertisementMutation,
  useUpdateNavAdvertisementMutation,
} = navAdvertisementApi;
