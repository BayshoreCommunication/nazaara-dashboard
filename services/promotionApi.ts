import { IPromotion, IPromotions } from "@/types/promotionTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const promotionsApi = createApi({
  reducerPath: "promotionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  tagTypes: ["Promotion"],
  endpoints: (builder) => ({
    getAllPromotions: builder.query<IPromotions, void>({
      query: () => `/api/v1/promotion`,
      providesTags: ["Promotion"],
    }),
    getAPromotionById: builder.query<IPromotion, string>({
      query: (id: string) => `/api/v1/promotion/${id}`,
      providesTags: ["Promotion"],
    }),
    createAPromotion: builder.mutation<IPromotion, Partial<IPromotion>>({
      query: (payload) => ({
        url: "/api/v1/promotion",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Promotion"],
    }),
    updateAPromotion: builder.mutation<
      IPromotion,
      { id: string; payload: Partial<IPromotion> }
    >({
      query: ({ id, payload }) => ({
        url: `/api/v1/promotion/${id}`,
        method: "PATCH",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Promotion"],
    }),
    deleteAPromotion: builder.mutation({
      query: (id) => ({
        url: `/api/v1/promotion/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Promotion"],
    }),
  }),
});

export const {
  useCreateAPromotionMutation,
  useDeleteAPromotionMutation,
  useGetAPromotionByIdQuery,
  useGetAllPromotionsQuery,
  useUpdateAPromotionMutation,
} = promotionsApi;
