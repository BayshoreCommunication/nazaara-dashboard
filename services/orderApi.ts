import { IOrders, IOrdersById } from "@/types/ordersTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query<IOrders, void>({
      query: () => `/api/v1/order`,
      providesTags: ["Orders"],
    }),
    getOrderById: builder.query<IOrdersById, string>({
      query: (id: string) => `/api/v1/order/${id}`,
      providesTags: ["Orders"],
    }),
    getOrderByUserId: builder.query<IOrdersById, string>({
      query: (id: string) => `/api/v1/order/user/${id}`,
      providesTags: ["Orders"],
    }),
    createOrder: builder.mutation<any, Partial<any>>({
      query: (payload) => ({
        url: "/api/v1/order",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: builder.mutation<any, { id: string; payload: Partial<any> }>({
      query: ({ id, payload }) => ({
        url: `/api/v1/order/${id}`,
        method: "PATCH",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/api/v1/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrderByUserIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
