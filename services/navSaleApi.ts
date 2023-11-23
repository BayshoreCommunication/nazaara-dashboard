import { TSale, TSaleData } from "@/types/saleTagTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const salesApi = createApi({
  reducerPath: "salesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  tagTypes: ["Sales"],
  endpoints: (builder) => ({
    getSales: builder.query<TSaleData, void>({
      query: () => `/api/v1/sale`,
      providesTags: ["Sales"],
    }),
    getSaleById: builder.query<TSaleData, string>({
      query: (id: string) => `/api/v1/sale/${id}`,
      providesTags: ["Sales"],
    }),
    createSale: builder.mutation<TSale, Partial<TSale>>({
      query: (payload) => ({
        url: "/api/v1/sale",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Sales"],
    }),
    updateSale: builder.mutation<
      TSale,
      { id: string; payload: Partial<TSale> }
    >({
      query: ({ id, payload }) => ({
        url: `/api/v1/sale/${id}`,
        method: "PATCH",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Sales"],
    }),
    deleteSale: builder.mutation({
      query: (id) => ({
        url: `/api/v1/sale/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sales"],
    }),
  }),
});

export const {
  useCreateSaleMutation,
  useDeleteSaleMutation,
  useGetSaleByIdQuery,
  useGetSalesQuery,
  useUpdateSaleMutation,
} = salesApi;
