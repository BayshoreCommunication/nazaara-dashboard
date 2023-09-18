import { IOrders, IOrdersById } from "@/types/ordersTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  endpoints: (builder) => ({
    getOrders: builder.query<IOrders, void>({
      query: () => `/api/v1/order`,
    }),
    getOrderById: builder.query<IOrdersById, string>({
      query: (id: string) => `/api/v1/order/${id}`,
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
      // Update the cache after successful creation
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled; // Wait for the query to be fulfilled
        await dispatch(orderApi.endpoints.getOrders.initiate()); // Fetch the updated category list
      },
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
      // Update the cache after successful creation
      async onQueryStarted(data: any, { dispatch, queryFulfilled }) {
        await queryFulfilled; // Wait for the query to be fulfilled
        await dispatch(orderApi.endpoints.getOrderById.initiate(data._id)); // Fetch the updated category
        await dispatch(orderApi.endpoints.getOrders.initiate()); // Fetch the updated category list
      },
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/api/v1/order/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
