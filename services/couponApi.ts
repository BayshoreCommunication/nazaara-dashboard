import { TCoupon, TCoupons } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const couponsApi = createApi({
  reducerPath: "couponsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  endpoints: (builder) => ({
    getCoupons: builder.query<TCoupons, void>({
      query: () => `/api/v1/coupon`,
    }),
    getCouponById: builder.query<TCoupon, string>({
      query: (id: string) => `/api/v1/coupon/${id}`,
    }),
    createCoupon: builder.mutation<TCoupon, Partial<TCoupon>>({
      query: (payload) => ({
        url: "/api/v1/coupon",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      // Update the cache after successful creation
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled; // Wait for the query to be fulfilled
        await dispatch(couponsApi.endpoints.getCoupons.initiate()); // Fetch the updated category list
      },
    }),
    updateCoupon: builder.mutation<
      TCoupon,
      { id: string; payload: Partial<TCoupon> }
    >({
      query: ({ id, payload }) => ({
        url: `/api/v1/coupon/${id}`,
        method: "PATCH",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      // Update the cache after successful creation
      async onQueryStarted(data: any, { dispatch, queryFulfilled }) {
        await queryFulfilled; // Wait for the query to be fulfilled
        await dispatch(couponsApi.endpoints.getCouponById.initiate(data._id)); // Fetch the updated category
        await dispatch(couponsApi.endpoints.getCoupons.initiate()); // Fetch the updated category list
      },
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/api/v1/coupon/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useGetCouponByIdQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponsApi;
