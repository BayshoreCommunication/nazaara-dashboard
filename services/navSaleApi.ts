import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ISale {
  saleTitle: string;
  navCategoryTitle: string;
  productSlug: string[];
  status: string;
  _id: string;
}

interface ISaleData {
  saleData: ISale[];
}

interface SlugData {
  slug: string;
}

interface ApiResponse {
  slugs: SlugData[];
}

export const salesApi = createApi({
  reducerPath: "salesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  tagTypes: ["Sales"],
  endpoints: (builder) => ({
    getSales: builder.query<ISaleData, void>({
      query: () => `/api/v1/nav-sale`,
      providesTags: ["Sales"],
    }),
    getSlugs: builder.query<ApiResponse, void>({
      query: () => `/api/v1/product/slugs`,
    }),
    getSaleById: builder.query<ISale, string>({
      query: (id: string) => `/api/v1/nav-sale/${id}`,
      providesTags: ["Sales"],
    }),
    createSale: builder.mutation<ISale, Partial<ISale>>({
      query: (payload) => ({
        url: "/api/v1/nav-sale",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Sales"],
    }),
    updateSale: builder.mutation<
      ISale,
      { id: string; payload: Partial<ISale> }
    >({
      query: ({ id, payload }) => ({
        url: `/api/v1/nav-sale/${id}`,
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
        url: `/api/v1/nav-sale/${id}`,
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
  useGetSlugsQuery,
} = salesApi;
