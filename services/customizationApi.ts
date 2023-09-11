import { ICustomization, IData } from "@/types/uiCustomization";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customizationApi = createApi({
  reducerPath: "customizationApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  tagTypes: ["Customization"],
  endpoints: (builder) => ({
    getCustomizationById: builder.query<ICustomization, string>({
      query: (id: string) => `/api/v1/customization/${id}`,
      providesTags: ["Customization"],
    }),

    updateCustomization: builder.mutation<
      IData,
      { id: string; payload: Partial<any> }
    >({
      query: ({ id, payload }) => ({
        url: `/api/v1/customization/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Customization"],
    }),
  }),
});

export const { useGetCustomizationByIdQuery, useUpdateCustomizationMutation } =
  customizationApi;
