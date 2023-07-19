import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IWarehouses {
  status: string;
  data: IWarehouse[];
  refetch?: any;
}

export interface IWarehouse {
  _id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const warehouseApi = createApi({
  reducerPath: "warehouseApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  endpoints: (builder) => ({
    getWarehouses: builder.query<IWarehouses, void>({
      query: () => `/api/v1/warehouse/`,
    }),
    createWarehouse: builder.mutation<IWarehouse, Partial<IWarehouse>>({
      query: (payload) => ({
        url: "/api/v1/warehouse",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      // Update the cache after successful creation
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled; // Wait for the query to be fulfilled
        await dispatch(warehouseApi.endpoints.getWarehouses.initiate()); // Fetch the updated category list
      },
    }),
    deleteWarehouse: builder.mutation({
      query: (id) => ({
        url: `/api/v1/warehouse/${id}`,
        method: "DELETE",
      }),
    }),
    updateWarehouse: builder.mutation<
      IWarehouse,
      { id: string; payload: Partial<IWarehouse> }
    >({
      query: ({ id, payload }) => ({
        url: `/api/v1/warehouse/${id}`,
        method: "PATCH",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

export const {
  useGetWarehousesQuery,
  useDeleteWarehouseMutation,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
} = warehouseApi;
