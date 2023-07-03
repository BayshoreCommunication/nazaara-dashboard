import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IPromotions {
    status: string
    data: IPromotion[]
    refetch?: any
  }
  
  export interface IPromotion {
    _id: string
    name: string
    status: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  



  export const promotionsApi = createApi({
    reducerPath: "promotionsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
    endpoints: (builder) => ({
      getPromotions: builder.query<IPromotions, void>({
        query: () => `/api/v1/promotion/`,
      }),
      createPromotion: builder.mutation<IPromotion, Partial<IPromotion>>({
        query: (payload) => ({
          url: '/api/v1/promotion/',
          method: 'POST',
          body: payload,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }),
        // Update the cache after successful creation
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled; // Wait for the query to be fulfilled
          await dispatch(promotionsApi.endpoints.getPromotions.initiate()); // Fetch the updated category list
        },
      }),
      deletePromotion: builder.mutation({
        query: (id) => ({
          url: `/api/v1/promotion/${id}`,
          method: 'DELETE',
        }),
      }),
      updatePromotion: builder.mutation<IPromotion, { id: string, payload: Partial<IPromotion> }>({
        query: ({ id, payload }) => ({
          url: `/api/v1/promotion/${id}`,
          method: 'PATCH',
          body: payload,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
      }),
    }),
  });
  
  export const { useGetPromotionsQuery, useCreatePromotionMutation, useDeletePromotionMutation, useUpdatePromotionMutation } = promotionsApi;