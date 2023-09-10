import { TCoupon, TCoupons } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const couponsApi = createApi({
  reducerPath: "couponsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  tagTypes: ["Coupon"],
  endpoints: (builder) => ({
    getCoupons: builder.query<TCoupons, void>({
      query: () => `/api/v1/coupon`,
      providesTags: ["Coupon"],
    }),
    getCouponById: builder.query<TCoupon, string>({
      query: (id: string) => `/api/v1/coupon/${id}`,
      providesTags: ["Coupon"],
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
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   await queryFulfilled; // Wait for the query to be fulfilled
      //   await dispatch(couponsApi.endpoints.getCoupons.initiate()); // Fetch the updated category list
      // },
      invalidatesTags: ["Coupon"],
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
      invalidatesTags: ["Coupon"],
      // Update the cache after successful creation
      // async onQueryStarted(data: any, { dispatch, queryFulfilled }) {
      //   await queryFulfilled; // Wait for the query to be fulfilled
      //   await dispatch(couponsApi.endpoints.getCouponById.initiate(data._id)); // Fetch the updated category
      //   await dispatch(couponsApi.endpoints.getCoupons.initiate()); // Fetch the updated category list
      // },
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/api/v1/coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
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
